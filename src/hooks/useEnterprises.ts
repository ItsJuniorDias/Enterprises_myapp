import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export const useEnterprises = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState([]);

  const fetch = async () => {
    try {
      const { docs } = await firestore().collection('enterprises').get();

      setData(docs);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    data,
    loading,
  };
};
