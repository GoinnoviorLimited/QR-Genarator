"use client"
import { useState, useEffect } from "react"
import { Home, BarChart3, Users, FolderOpen, MessageCircle, Bell, Settings, Menu, X, Crown } from "lucide-react"
import Link from "next/link"

const Menubar = ({ onSidebarToggle }) => {
    const [isExpanded, setIsExpanded] = useState(true)
    const [activeItem, setActiveItem] = useState("dashboard")

    const menuItems = [
        { id: "/dashboard", icon: Home, label: "Dashboard" },
        { id: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
        { id: "users", icon: Users, label: "Users" },
        { id: "projects", icon: FolderOpen, label: "Projects" },
        { id: "messages", icon: MessageCircle, label: "Messages" },
        { id: "notifications", icon: Bell, label: "Notifications" },
        { id: "settings", icon: Settings, label: "Settings" },
    ]

    const toggleSidebar = () => {
        const newExpandedState = !isExpanded
        setIsExpanded(newExpandedState)
        onSidebarToggle?.(newExpandedState)
    }

    const handleItemClick = (itemId) => {
        setActiveItem(itemId)
    }

    // Close sidebar on mobile when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const sidebar = document.getElementById("sidebar")
            if (window.innerWidth <= 768 && sidebar && !sidebar.contains(event.target) && isExpanded) {
                setIsExpanded(false)
                onSidebarToggle?.(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isExpanded, onSidebarToggle])

    return (
        <>
            {/* Premium Sidebar */}
            <nav
                id="sidebar"
                className={`fixed top-0 left-0 h-full backdrop-blur-2xl transition-all duration-700 ease-out z-50 ${isExpanded ? "w-80 md:w-80" : "w-20"
                    } ${isExpanded && "md:w-80"}`}
                style={{
                    background: "linear-gradient(135deg, rgba(5, 46, 22, 0.9), rgba(6, 78, 59, 0.8), rgba(4, 120, 87, 0.7))",
                    backdropFilter: "blur(25px)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
            >
                {/* Luxury Header */}
                <div className="flex items-center justify-between p-6 border-b border-emerald-500/20">
                    {isExpanded && (
                        <div
                            className={`flex items-center space-x-3 transition-all duration-500 ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                                }`}
                        >
                            <div className="relative">
                                <Crown className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
                                <div className="absolute inset-0 w-8 h-8 bg-yellow-400/20 rounded blur animate-pulse"></div>
                            </div>
                            <div>
                                <div className="text-white font-bold text-2xl tracking-wide">LUXE</div>
                                <div className="text-emerald-300/80 text-xs font-light tracking-widest uppercase">Premium Suite</div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={toggleSidebar}
                        className="relative w-12 p-2 h-12 bg-gradient-to-br from-emerald-600/30 to-green-700/20 hover:from-emerald-500/40 hover:to-green-600/30 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 group border border-emerald-500/30 shadow-xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                        {isExpanded ? (
                            <X className="w-6 h-6 text-white transition-all duration-300 group-hover:rotate-90 drop-shadow-md" />
                        ) : (
                            <Menu className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-110 drop-shadow-md" />
                        )}
                    </button>
                </div>

                {/* Navigation Menu */}
                <div className="py-8 px-4">
                    {menuItems.map((item, index) => {
                        const IconComponent = item.icon
                        const isActive = activeItem === item.id

                        return (
                            <div key={item.id} className="mb-3" style={{ animationDelay: `${index * 0.1}s` }}>
                                <Link
                                    href={item.id}
                                    onClick={() => handleItemClick(item.id)}
                                    className={`w-full flex items-center px-1 py-3 rounded-2xl transition-all duration-500 group relative overflow-hidden ${isActive ? "text-white shadow-2xl" : "text-emerald-100/80 hover:text-white hover:translate-x-2"
                                        }`}
                                    style={
                                        isActive
                                            ? {
                                                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))",
                                                border: "1px solid rgba(16, 185, 129, 0.4)",
                                                boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                                            }
                                            : {}
                                    }
                                >
                                    {/* Luxury Active indicator */}
                                    <div
                                        className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-yellow-400 via-emerald-400 to-green-500 transition-all duration-500 rounded-r ${isActive ? "scale-y-100 shadow-lg shadow-emerald-400/50" : "scale-y-0"
                                            }`}
                                    ></div>

                                    {/* Icon with luxury glow */}
                                    <div className="min-w-[2.5rem] flex items-center justify-center relative">
                                        <IconComponent
                                            className={`w-5 h-5 transition-all duration-500 ${isActive
                                                ? "text-white drop-shadow-lg scale-110"
                                                : "group-hover:scale-125 group-hover:text-emerald-300"
                                                }`}
                                        />
                                        {isActive && (
                                            <div className="absolute inset-0 w-6 h-6 bg-emerald-400/20 rounded-full blur animate-pulse"></div>
                                        )}
                                    </div>

                                    {/* Text with luxury styling */}
                                    <span
                                        className={`ml-4 font-semibold whitespace-nowrap transition-all duration-500 ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                                            } ${isActive ? "text-white drop-shadow-sm" : ""}`}
                                    >
                                        {item.label}
                                    </span>

                                    {/* Premium shimmer effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                                    {/* Luxury border glow on hover */}
                                    {!isActive && (
                                        <div className="absolute inset-0 rounded-2xl border border-emerald-500/0 group-hover:border-emerald-500/30 transition-all duration-300"></div>
                                    )}
                                </Link>
                            </div>
                        )
                    })}
                </div>

                {/* Luxury Footer */}
                <div
                    className={`absolute bottom-6 left-0 right-0 px-6 transition-all duration-500 ${isExpanded ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="bg-gradient-to-r from-emerald-600/20 to-green-700/20 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                            <span className="text-emerald-200/90 text-sm font-medium">Premium Active</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Overlay */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
                    onClick={() => setIsExpanded(false)}
                ></div>
            )}
        </>
    )
}

export default Menubar