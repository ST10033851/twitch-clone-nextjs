import { Toggle } from "./Toggle"
import { Wrapper } from "./Wrapper"
import { Navigation } from "./navigation"

export const Sidebar = () =>{
    return (
        <Wrapper>
            <Toggle />
            <Navigation />
        </Wrapper>
    )
}