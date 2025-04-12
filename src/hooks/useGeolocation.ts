import  { useState, useEffect } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
    error: string | null;
    loading: boolean;
  }>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: "Geolocation is not supported by your browser",
        loading: false
      }));
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false
      });
    };

    const error = () => {
      setLocation(prev => ({
        ...prev,
        error: "Unable to retrieve your location",
        loading: false
      }));
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return location;
}
 