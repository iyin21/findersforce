/* eslint-disable camelcase */
import { useId } from "@mantine/hooks"
import { ErrorMessage, Field, useFormikContext } from "formik"
import { useEffect, useRef, useState } from "react"

const GoogleAutoComplete = ({
    isOpen = true,
    fieldName = "formattedAddress",
}: {
    isOpen?: boolean
    fieldName: string
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [sessionToken] = useState<string | null>(useId())
    const { setFieldValue, setErrors, values, errors, touched } =
        useFormikContext<{
            latitude: any
            longitude: any
            [key: string]: string
        }>()
    const center = { lat: 50.064192, lng: -130.605469 }

    // Create a bounding box with sides ~10km away from the center point
    const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
    }

    const handleAutoComplete = () => {
        const options = {
            bounds: defaultBounds,
            componentRestrictions: { country: ["ng", "uk"] },
            fields: ["address_components", "geometry", "formatted_address"],
            sessionToken: sessionToken,
        }

        if (inputRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                inputRef.current,
                options
            )

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace()
                if (!place.geometry) {
                    setErrors({
                        [fieldName]: "Please select an address option",
                    })
                    setFieldValue(fieldName, "")
                    return
                }

                if (place.geometry) {
                    setFieldValue(fieldName, place?.formatted_address as string)
                }

                if (fieldName === "formattedAddress") {
                    setFieldValue("longitude", place?.geometry?.location?.lng())
                    setFieldValue("latitude", place?.geometry?.location?.lat())
                }

                // const lga = place?.address_components?.filter(
                //     ({ types }) =>
                //         types.includes("sublocality_level_1") ||
                //         types.includes("administrative_area_level_2")
                // )[0]

                // const state = place?.address_components?.filter(({ types }) =>
                //     types.includes("locality")
                // )[0]

                // setFieldValue("lga", lga?.long_name as string)
                // setFieldValue("state", state?.long_name as string)
            })
        }
    }

    useEffect(() => {
        if (isOpen) {
            handleAutoComplete()
        }
    }, [isOpen])

    return (
        <>
            <p className="text-3md font-semibold mb-3 text-neutral-80 block">
                Location
            </p>
            <Field
                placeholder="Enter your address"
                type="text"
                name={fieldName}
                id="autocomplete"
                innerRef={inputRef}
                value={values[fieldName] ?? ""}
                data-testid="address"
                aria-label="address"
                className={`w-full outline-none border border-black-20 p-4 rounded text-lg ${
                    errors[fieldName] && touched[fieldName]
                        ? "border-red-100"
                        : ""
                } `}
            />
            <ErrorMessage
                name={fieldName}
                component="div"
                className="text-red-100"
            />
        </>
    )
}

export default GoogleAutoComplete
