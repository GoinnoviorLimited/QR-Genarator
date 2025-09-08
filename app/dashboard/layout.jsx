"use client"
import { Diamond, Sparkles } from "lucide-react"
import { useState } from "react"
import Menubar from "../components/ui/Menubar"
import Topbar from "../components/ui/Topbar"


export default function DashLayout({ children }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

    const handleSidebarToggle = (isExpanded) => {
        setIsSidebarExpanded(isExpanded)
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black overflow-hidden">
            {/* Luxury Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Floating orbs with green luxury glow */}
                <div className="absolute w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-green-600/10 rounded-full top-1/4 left-1/5 blur-xl animate-pulse"></div>
                <div
                    className="absolute w-40 h-40 bg-gradient-to-br from-green-500/15 to-emerald-700/10 rounded-full top-3/5 right-1/4 blur-2xl animate-bounce"
                    style={{ animationDuration: "4s" }}
                ></div>
                <div
                    className="absolute w-24 h-24 bg-gradient-to-br from-lime-400/20 to-green-800/10 rounded-full bottom-1/4 left-3/5 blur-xl animate-ping"
                    style={{ animationDuration: "6s" }}
                ></div>

                {/* Luxury sparkles */}
                <div className="absolute top-1/3 right-1/3">
                    <Sparkles className="w-4 h-4 text-emerald-400/40 animate-pulse" />
                </div>
                <div className="absolute bottom-1/2 left-1/4">
                    <Diamond className="w-3 h-3 text-green-400/30 animate-bounce" style={{ animationDuration: "3s" }} />
                </div>
            </div>

            <Menubar onSidebarToggle={handleSidebarToggle} />
            <Topbar isSidebarExpanded={isSidebarExpanded} />

            <main
                className={`relative z-10 transition-all duration-700 ease-out p-6 ${isSidebarExpanded
                        ? "ml-80 mt-14" // When expanded, leave space for full sidebar width
                        : "ml-20 mt-14" // When collapsed, leave space for collapsed sidebar width
                    }`}
            >
                {children}
            </main>
        </div>
    )
}