"use client"

import { Search, Bell, User, Sun, Moon, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"


export default function Topbar({ isSidebarExpanded }) {
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [notifications] = useState([
        { id: 1, title: "New user registered", time: "2 min ago", unread: true },
        { id: 2, title: "System update completed", time: "1 hour ago", unread: true },
        { id: 3, title: "Backup completed", time: "3 hours ago", unread: false },
    ])

    const unreadCount = notifications.filter((n) => n.unread).length

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDarkMode])

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
    }

    return (
        <header
            className={`fixed top-0 right-0 z-20 h-16 transition-all duration-700 ease-out ${isSidebarExpanded ? "left-80" : "left-20"
                }`}
        >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-card/80 backdrop-blur-md border-b border-border"></div>

            <div className="relative flex items-center justify-between h-full px-6">
                {/* Left side - Search */}
                <div className="flex items-center space-x-4 flex-1 max-w-md">
                    <div className="relative w-full">
                       <h2 className="text-lg font-semibold uppercase font-serif">Dashboard</h2>
                    </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center space-x-3">
                    {/* Notifications */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="relative p-2 hover:bg-accent/10">
                                <Bell className="w-5 h-5 text-foreground" />
                                {unreadCount > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 bg-primary"
                                    >
                                        {unreadCount}
                                    </Badge>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0" align="end">
                            <div className="p-4 border-b border-border">
                                <h3 className="font-semibold text-foreground">Notifications</h3>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-3 border-b border-border/50 hover:bg-accent/5 cursor-pointer ${notification.unread ? "bg-primary/5" : ""
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-foreground">{notification.title}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                            </div>
                                            {notification.unread && <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Theme Toggle */}
                    <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2 hover:bg-accent/10">
                        {isDarkMode ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
                    </Button>

                    {/* User Profile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-accent/10">
                                <Avatar className="h-9 w-9 border-2 border-primary/20 rounded-full">
                                    <AvatarImage className="rounded-full" src="https://github.com/shadcn.png" alt="User" />
                                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                        <User className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none text-foreground">John Doe</p>
                                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}