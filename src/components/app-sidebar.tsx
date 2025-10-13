import * as React from 'react';
import {
    IconChartBar,
    IconDashboard,
    IconFolder,
    IconListDetails,
    IconUsers,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: IconDashboard,
        },
        {
            title: 'Users',
            url: '/dashboard/users',
            icon: IconUsers,
        },
        {
            title: 'Courses',
            url: '/dashboard/courses',
            icon: IconListDetails,
        },
        {
            title: 'Analytics',
            url: '#',
            icon: IconChartBar,
        },
        {
            title: 'Projects',
            url: '#',
            icon: IconFolder,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link to="#">
                                <img
                                    src="/logo.png"
                                    alt="The Recident Creator"
                                    className="size-6"
                                />
                                <span className="text-base font-semibold">
                                    The Recident Creator
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavDocuments items={data.documents} /> */}
                {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
