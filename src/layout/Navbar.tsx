import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { role } from "@/constents/role"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useUpdateAvailabilityMutation } from "@/redux/features/driver/driver.api"
import { useAppDispatch } from "@/redux/hooks"
import { AlignJustify } from "lucide-react"
import { Link } from "react-router"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/driver", label: "Dashboard", role: role.driver },
  { href: "/rider", label: "Dashboard", role: role.rider },
]

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined)
  const [logout] = useLogoutMutation()
  const [updateAvailability] = useUpdateAvailabilityMutation()
  const dispatch = useAppDispatch()
  console.log(data)

  const handleLogout = async () => {
    await logout(undefined)
    dispatch(authApi.util.resetApiState())
  }

  const handleAvailability = async () => {
    const newStatus = data?.data?.isOnline === true ? false : true

    try {
      const res = await updateAvailability({ isOnline: newStatus }).unwrap()
      console.log(res)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <header className="w-full fixed bg-muted z-20">
      <div className="max-w-7xl px-6 mx-auto flex h-16 justify-between gap-4">
        {/* Left side */}
        <div className="flex gap-2">
          <div className="flex items-center md:hidden">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <AlignJustify />
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                  <div>
                    {link.role === "PUBLIC" &&
                      (<NavigationMenuItem key={index} className="h-full">
                        <NavigationMenuLink asChild className="py-2">
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>)}
                    {link.role === data?.data?.role &&
                      (<NavigationMenuItem key={index} className="h-full">
                        <NavigationMenuLink asChild className="py-2">
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>)}  
                  </div>
                ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>
          {/* Main nav */}
          <div className="flex items-center gap-6">
             <h3 className="text-xl md:text-2xl font-semibold">Ride Ease.</h3>
            {/* Navigation menu */}
            <NavigationMenu className="h-full *:h-full max-md:hidden">
              <NavigationMenuList className="h-full gap-2">
                {navigationLinks.map((link, index) => (
                  <div>
                    {link.role === "PUBLIC" &&
                      (<NavigationMenuItem key={index} className="h-full">
                        <NavigationMenuLink asChild className="hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!">
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>)}
                    {link.role === data?.data?.role &&
                      (<NavigationMenuItem key={index} className="h-full">
                        <NavigationMenuLink asChild className="hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!">
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>)}  
                  </div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {data?.data?.role === role.driver && <Button
            onClick={handleAvailability}
            variant="outline" size="sm"
            className={`
        ${data?.data?.isOnline && "bg-green-500 text-muted"}`}
          >
            {data?.data?.isOnline ? "Online" : "Offline"}
          </Button>}
          {data?.data?.email && <Button onClick={handleLogout} size="sm">
            Logout
          </Button>}

          {!data?.data?.email && <Button size={"sm"} asChild>
            <Link to={"/register"}>Sign up</Link>
          </Button>}
        </div>
      </div>
    </header>
  )
}
