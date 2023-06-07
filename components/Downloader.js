import React, {useState} from 'react';
import {Text, View, TextInput, Button, PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
const Downloader = () => {
  const [pastedurl, setPastedurl] = useState('');
  const [per,setPer] = useState();
  const requestStoragePermission = async () => {
    try {
        // const permission = [ PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, ];   
        // const granted1 = await PermissionsAndroid.requestMultiple(permission); 
        // setPer(per)
        // console.log(per);

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Downloader  App  Permission',
          message:
            'Download App needs access to your storage ' +
            'so you can download files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFiles()
        console.log('You can use the storage');
      } else {
        console.log('storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadFiles = () => {
    const {config, fs} = RNFetchBlob;
    const date = new Date();
    const fileDir = fs.dirs.DownloadDir;
    config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path : fileDir +"/download_"+ Math.floor(date.getDate()+date.getSeconds()/2)+".mp4",
        description : 'file download'
      }
    })
      .fetch('GET', pastedurl, {
        //some headers ..
      })
      .then(res => {
        // the temp file path
        console.log('The file saved to ', res.path());
        alert("file downloaded successfully")
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Downloader</Text>
      <TextInput
        placeholder="enter url"
        style={{
          width: '90%',
          height: 50,
          borderWidth: 5,
          alignSelf: 'center',
          paddingLeft: 20,
          borderRadius: 20,
        }}
        value={pastedurl}
        onChangeText={val => setPastedurl(val)}
      />
      <Button
        title="Download"
        onPress={() => {
          if (pastedurl !== '') {
            requestStoragePermission();
            // requestCameraPermission()
          } else {
            alert('Please add url');
          }
        }}/>
    </View>
  );
};

export default Downloader;
