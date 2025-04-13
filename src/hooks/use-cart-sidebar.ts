import { usePathname } from "next/navigation"
import UseCartStore from "./use-cart-store"
import useDeviceType from "./use-device-type"

const isNotInPaths = (s: string) => 
    !/^\/$|^\/cart$|^\/checkout$|^\/sign-in$|^\/sing-up$|^\/order(\/.*)?$|^\/account(\/.*)?$|^\/admin(\/.*)?$/.test(s)

function useCartSidebar(){
    const {
        cart: { items }
    } = UseCartStore()

    const deviceType = useDeviceType()
    const currentPath = usePathname()

    return (
        items.length > 0 && deviceType === 'desktop' && isNotInPaths(currentPath)
    )
}

export default useCartSidebar;