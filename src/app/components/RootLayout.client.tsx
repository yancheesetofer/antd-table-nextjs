'use client'

import { useCallback, useState } from 'react'
import { Layout, Menu, Drawer, type MenuProps } from 'antd'
import { HomeFilled, RightOutlined, LeftOutlined, TableOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

import { useRenderMenusItems } from '@/hooks/useRenderMenusItems'
import { useMenuSelectedKeys } from '@/hooks/useMenuSelectedKeys'

import { LogoIcon } from './LogoIcon.client'

type MenuClickEventHandler = Required<MenuProps>['onClick']

type Props = { children: React.ReactNode }

const RootLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const items = useRenderMenusItems([
    { name: 'Home', path: 'home', icon: <HomeFilled /> },
    { name: 'Content', path: 'content', icon: <TableOutlined /> },
  ])
  const { selectedKeys, defaultOpenKeys } = useMenuSelectedKeys()

  const [collapsed, setCollapsed] = useState(true)
  const [menuOpened, setMenuOpened] = useState(false)

  const handleClick: MenuClickEventHandler = useCallback(
    (event) => {
      const keyPath = [...event.keyPath]
      const path = `/${keyPath.reverse().join('/')}`
      router.push(path)
    },
    [router],
  )
  const handleOpenAppMenu = useCallback(() => setMenuOpened(true), [])
  const handleCloseAppMenu = useCallback(() => setMenuOpened(false), [])

  return (
    <Layout className="h-screen">
      <Layout.Sider
        className="min-h-screen"
        width={250}
        collapsed={collapsed}
        collapsible
        onCollapse={setCollapsed}
        trigger={
          <div className="flex h-full items-center justify-center">
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </div>
        }
      >
        <div className="sticky top-0 z-[1] flex h-[70px]  select-none items-center overflow-hidden px-0 text-[25px] text-white">
          <div className="flex cursor-pointer px-8 py-[27px]" onClick={handleOpenAppMenu}>
            <LogoIcon fill="#fff" />
          </div>

          {!collapsed && <div>yc</div>}
        </div>

        <Drawer
          maskClosable
          closable={false}
          autoFocus={false}
          placement="left"
          open={menuOpened}
          width={250}
          getContainer={false}
          styles={{ mask: { background: 'none', visibility: 'visible' }, body: { padding: 0 } }}
          onClose={handleCloseAppMenu}
        >
          <div className="flex items-center justify-between">
            <div className="flex cursor-pointer px-8 py-[27px]" onClick={handleCloseAppMenu}>
              <LogoIcon fill="#000" />
            </div>

            <a className="pr-6" href={`https://google.com.hk`}>
              All Apps
            </a>
          </div>

          <div className="px-6">
            <h2 className="m-0">Apps</h2>
          </div>
        </Drawer>

        <div
          className={clsx(
            'absolute bottom-20 w-full text-center text-white opacity-20 transition-all duration-[0.2s] ease-[ease]',
            collapsed ? 'text-[40px] leading-[40px]' : 'text-[135px] leading-[135px]',
          )}
        >
          yc
        </div>

        <Menu
          theme="dark"
          mode="inline"
          items={items}
          forceSubMenuRender={false}
          selectedKeys={selectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          onClick={handleClick}
        />
      </Layout.Sider>

      <Layout>
        <Layout.Header className="z-[100] flex items-center justify-between !bg-white px-3.5 shadow-[0_0_5px_0_rgb(0_0_0_/_20%)]">
          <div className="text-lg sm:text-xl lg:text-2xl">Learn Ant Design in Minutes</div>
          <div className="hidden sm:block">
            <a className="text-black" href="https://yanchris.tech">
              @yancheesetofer
            </a>
          </div>
        </Layout.Header>

        <Layout.Content className="m-0 flex flex-col overflow-auto p-3.5">
          {children}
        </Layout.Content>
        <Layout.Footer className="z-[100] !bg-white">
          <div>
            <a className="text-black" href="https://yanchris.tech">
              yanchris.tech
            </a>
          </div>
        </Layout.Footer>
      </Layout>
    </Layout>
  )
}

export { RootLayout }
