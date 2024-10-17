import { Card } from "flowbite-react"
import { ReactNode } from "react"

interface PropsWrapperCard {
    children: ReactNode
}

export default function WrapperCard({ children }: PropsWrapperCard) {
    return(
        <>
            <Card>
                {children}
            </Card>
        </>
    )
}