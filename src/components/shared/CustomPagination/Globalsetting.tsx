"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


import GoogleTranslate from "@/components/Translate/GoogleTranslate"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CountrySelect from "../CountrySelect";

interface GlobalSettingsModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function GlobalSettingsModal({ open = true, onOpenChange = () => {} }: GlobalSettingsModalProps) {

  const router = useRouter()
  const [selectedCountry] = useState<string | null>(null)

  // List of countries and their flags
  

  // Function to handle country selection

  // Function to handle saving settings
  const handleSave = () => {
    if (selectedCountry) {
      console.log("Selected Country:", selectedCountry)
    }
    router.push("/") // Navigate to the homepage or wherever needed
    onOpenChange(false) // Close the modal
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-normal text-center flex-1">Global Settings</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={() => onOpenChange(false)}
              aria-label="Close settings"
            >
   
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          {/* Google Translate Component */}
          <div className="space-y-2">
            <GoogleTranslate />
          </div>

          {/* Country Selection */}
          <div className="space-y-2">
  <CountrySelect />
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
