import {useEffect, useState} from "react"
import {createPortal} from "react-dom"
import {ReactNode} from "react"
import React from "react"

interface PortalProps {
    children?: ReactNode
}

const Portal = ({children}: PortalProps) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        return () => setMounted(false)
    }, [])

    return !mounted ? null :
        createPortal(children,
            document.querySelector(`#portals`) as HTMLElement
        )
}

export default Portal
