
"use client";

import React, { useEffect, useRef, useState } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyCedqAiIL3yCrp7K_HdCLezqqMd_peAEFs";

export interface LatLng {
  lat: number;
  lng: number;
}

// Extend window interface for Google Maps and Google Translate
declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (options: object, container: string) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const PlaceAutocompleteInput: React.FC<{
  coordinates: LatLng;
  setCoordinates: React.Dispatch<React.SetStateAction<LatLng>>;
}> = ({ coordinates, setCoordinates }) => {
  const inputRef = useRef<HTMLInputElement>(null);
const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [isScriptLoading, setIsScriptLoading] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  const initializeAutocomplete = React.useCallback(() => {
    // Check if google maps is loaded
  if (typeof window === 'undefined' || !window.google) {

      console.error("Google Maps not loaded");
      return;
    }

    if (!inputRef.current) return;

    try {
      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode", "establishment"],
        }
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (!place?.geometry) {
          alert("No location details available.");
          return;
        }

        if (place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setCoordinates({ lat, lng });
        } else {
          alert("No location data available for this place.");
        }
      });
    } catch (error) {
      console.error("Error initializing autocomplete:", error);
    }
  }, [setCoordinates]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (isScriptLoading || scriptError) return;

      setIsScriptLoading(true);
      
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        setIsScriptLoading(false);
        initializeAutocomplete();
      };
      
      script.onerror = () => {
        setIsScriptLoading(false);
        setScriptError("Failed to load Google Maps script");
        console.error("Failed to load Google Maps script");
      };
      
      document.head.appendChild(script);
    };

    if (typeof window !== 'undefined') {
      if (!(window).google) {
        loadGoogleMapsScript();
      } else {
        initializeAutocomplete();
      }
    }

    return () => {
      // Cleanup listeners if needed
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isScriptLoading, scriptError, initializeAutocomplete]);

  return (
    <div style={{ maxWidth: "100%" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a place..."
        style={{
          width: "100%",
          padding: "10px 12px",
          fontSize: 16,
          borderRadius: 4,
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
        disabled={isScriptLoading}
      />

      {isScriptLoading && (
        <div style={{ marginTop: 10, color: "#666" }}>
          Loading Google Maps...
        </div>
      )}

      {scriptError && (
        <div style={{ marginTop: 10, color: "red" }}>
          {scriptError}
        </div>
      )}

      {coordinates && (
        <div style={{ marginTop: 20 }}>
          <p>Selected coordinates:</p>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}
    </div>
  );
};

export default PlaceAutocompleteInput;