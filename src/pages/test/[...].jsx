import * as React from "react"

export default function ClientOnly(props) {
    const [url, setUrl] = React.useState('')
    console.log(props);

    React.useEffect(() => {
        setUrl(window.location.toString())
    }, [])

    return (
        <h1>
            ClientOnly (/test/*): {url}
        </h1>
    )
}