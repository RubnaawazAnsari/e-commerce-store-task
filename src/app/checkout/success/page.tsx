'use client'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Button, Card, Typography, Result } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

import { clearCart } from '@/store/reducers/cartSlice'

const { Text } = Typography

export default function CheckoutSuccessPage() {
  const { items: cartItems, totalPrice } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()

  return (
    <div className="container mx-auto px-4 py-8">
      <Result
        icon={<SmileOutlined style={{ color: '#0a96d4' }} />}
        status="success"
        title="Order Placed Successfully!"
        subTitle="7Ybhf9I5G"
        extra={[
          <Link href="/" key="continue">
            <Button 
              type="primary" 
              className="!bg-[#0a96d4] !text-white !border-none hover:!bg-[#087bb3]"
              size="large"
              onClick={() => dispatch(clearCart())}
            >
              Continue Shopping
            </Button>
          </Link>,
        ]}
      />

      <Card title="Order Summary" className="mt-8 max-w-2xl mx-auto">
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between">
              <div>
                <Text strong>{item.title}</Text>
                <Text type="secondary" className="block">
                  {item.quantity} × ${item.price.toFixed(2)}
                </Text>
              </div>
              <Text>${(item.price * item.quantity).toFixed(2)}</Text>
            </div>
          ))}

          <div className="border-t border-gray-200 my-4"></div>

          <div className="flex justify-between">
            <Text strong className="text-lg">Total</Text>
            <Text strong className="text-lg">
              ${totalPrice.toFixed(2)}
            </Text>
          </div>
        </div>
      </Card>

      <div className="mt-8 text-center">
        <Text type="secondary">
          A confirmation email has been sent to your registered email address.
        </Text>
      </div>
    </div>
  )
}