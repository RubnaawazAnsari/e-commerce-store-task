'use client'
import React from "react"
import { Menu, Button, Drawer, Grid, Badge, Dropdown } from "antd"
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { useAppSelector } from '@/store/hooks'
import Link from 'next/link'

const { useBreakpoint } = Grid

const Navbar = () => {
  const [visible, setVisible] = React.useState(false)
  const screens = useBreakpoint()
  const { items: cartItems } = useAppSelector(state => state.cart)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const menuItems = [
    { label: "Home", key: "home", href: "/" },
    { label: "Categories", key: "categories", href: "/categories" },
  ]

  const cartMenu = {
    items: [
      {
        key: "1",
        label: (
          <div className="w-96 max-[768px]:w-80 p-2 bg-white">
            <p className="font-semibold mb-2">Cart Items ({totalItems})</p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.id} className="flex justify-between border-b pb-2">
                    <span className="truncate">{item.title}</span>
                    <span>${item.price} × {item.quantity}</span>
                  </div>
                ))
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>
            {cartItems.length > 0 && (
              <Link href="/cart">
                <Button  className="w-full mt-4 !bg-[#0a96d4] !text-white border-none !hover:bg-[#087bb3]">Go to Cart</Button>
              </Link>
            )}
          </div>
        ),
      },
    ],
  }

  return (
    <div className="flex items-center justify-between h-26 max-[769px]:h-20 px-16 max-[769px]:px-6 bg-white shadow-2xl sticky top-0 z-50">
      <Link href="/">
        <h3 className="text-[32px] max-[769px]:text-[24px] font-bold text-[#0a96d4]"><span className="text-[#000]">FAKE</span>STORE</h3>
      </Link>

      {screens.xl ? (
        <div className="flex items-center space-x-6">

          <Menu
            mode="horizontal"
            items={menuItems.map(item => ({
              ...item,
              label: <Link href={item.href}>{item.label}</Link>
            }))}
            defaultSelectedKeys={["home"]}
            className="border-none [&_.ant-menu-item]:text-[18px]"
          />
          <Dropdown menu={cartMenu} trigger={['click']} placement="bottomRight" arrow>
            <Badge count={totalItems} offset={[0, 0]}>
              <ShoppingCartOutlined className="!text-[32px] text-[#0a96d4] cursor-pointer" />
            </Badge>
          </Dropdown>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 space-x-4">
            <Dropdown menu={cartMenu} trigger={['click']} placement="bottomRight" arrow>
              <Badge count={totalItems} offset={[0, 0]}>
                <ShoppingCartOutlined className="!text-[32px] cursor-pointer" />
              </Badge>
            </Dropdown>

            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setVisible(true)}
              className="!text-[24px]"
            />
          </div>
          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setVisible(false)}
            open={visible}
          >
            <Menu
              mode="vertical"
              items={menuItems.map(item => ({
                ...item,
                label: <Link href={item.href}>{item.label}</Link>
              }))}
              onClick={() => setVisible(false)}
              className="border-none"
            />
          </Drawer>
        </>
      )}
    </div>
  )
}

export default Navbar