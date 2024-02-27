import * as React from "react"

export default function ClientOnly2(props) {
    const [url, setUrl] = React.useState('')
    console.log(props);

    React.useEffect(() => {
        setUrl(window.location.toString())
    }, [])

    return (
        <div>
            <h1>
                ClientOnly (/test-1/{`[username]`}): {url}
            </h1>

            <pre>
                {props.params['id']}
            </pre>
        </div>
    )
}