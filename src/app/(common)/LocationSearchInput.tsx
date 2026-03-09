// /* eslint-disable @typescript-eslint/no-explicit-any */
// // components/LocationSearchInput.tsx
// 'use client';

// import { LoadScript, Autocomplete } from '@react-google-maps/api';
// import { Input } from 'antd';
// import { useRef } from 'react';

// const libraries = ['places'];

// export default function LocationSearchInput({ form }: { form: any }) {
//   const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

//   const handlePlaceChanged = () => {
//     const place = autocompleteRef.current?.getPlace();
//     if (place && place.geometry && place.geometry.location) {
//       const lat = place.geometry.location.lat();
//       const lng = place.geometry.location.lng();
//       const address = place.formatted_address || '';

//       // Set values in form
//       form.setFieldsValue({
//         address: address,
//         lat: lat,
//         long: lng,
//       });
//     }
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey="AIzaSyDRCsyCD7qIf0R3g599Un3wqmEq9KWzgeY"
//       libraries={libraries}
//     >
//       <Autocomplete
//         onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
//         onPlaceChanged={handlePlaceChanged}
//       >
//         <Input
//           size="large"
//           placeholder="Search location"
//           style={{ width: '100%' }}
//         />
//       </Autocomplete>
//     </LoadScript>
//   );
// }
