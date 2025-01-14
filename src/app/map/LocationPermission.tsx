"use client";

import { useEffect } from "react";

interface LocationPermissionProps {
  onPermissionUpdate: (isGranted: boolean) => void;
}

export default function LocationPermission({
  onPermissionUpdate,
}: LocationPermissionProps) {
  useEffect(() => {
    const checkPermission = async () => {
      if (navigator.permissions) {
        const result = await navigator.permissions.query({ name: "geolocation" });
        onPermissionUpdate(result.state === "granted");

        result.onchange = () => {
          onPermissionUpdate(result.state === "granted");
        };
      } else {
        onPermissionUpdate(false); // 브라우저가 지원하지 않을 경우
      }
    };

    checkPermission();
  }, [onPermissionUpdate]);

  return null;
}
