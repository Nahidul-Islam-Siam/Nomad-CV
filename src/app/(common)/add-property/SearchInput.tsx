"use client";

import { Input } from "antd";

export type LatLng = {
  lat: number;
  lng: number;
};

interface PlaceSearchInputProps {
  coordinates: LatLng | null;
  setCoordinates: (value: LatLng) => void;
}

export default function PlaceSearchInput({
  coordinates,
  setCoordinates,
}: PlaceSearchInputProps) {
  const latValue = coordinates?.lat ?? 0;
  const lngValue = coordinates?.lng ?? 0;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Input
        size="large"
        type="number"
        step="any"
        placeholder="Latitude"
        value={latValue}
        onChange={(e) =>
          setCoordinates({
            lat: Number(e.target.value) || 0,
            lng: lngValue,
          })
        }
      />
      <Input
        size="large"
        type="number"
        step="any"
        placeholder="Longitude"
        value={lngValue}
        onChange={(e) =>
          setCoordinates({
            lat: latValue,
            lng: Number(e.target.value) || 0,
          })
        }
      />
    </div>
  );
}

