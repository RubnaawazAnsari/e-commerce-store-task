'use client'
import { Button, Card, Rate } from 'antd'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/reducers/cartSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { App } from 'antd'

const { Meta } = Card

const ProductCard = ({ product }: { product: any }) => {
  const dispatch = useDispatch()
  const { message: messageApi } = App.useApp()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(addToCart(product))
    if (isMounted) {
      messageApi.success(`${product.title} added to cart!`)
    }
  }

  return (
    <Link href={`/productDetail/${product.id}`} passHref legacyBehavior>
      <Card
        hoverable
        className='border !border-[#D9D9D9] rounded-lg'
        cover={
          <div className="h-64 relative">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4"
              priority
            />
          </div>
        }
      >
        <Meta
          title={product.title}
          description={
            <>
              <Rate disabled defaultValue={product.rating?.rate} />
              <div className="mt-2 font-bold text-lg">${product.price}</div>
            </>
          }
        />
        <Button
          className="w-full !h-10 mt-4 !bg-[#0a96d4] !text-white border-none !hover:bg-[#087bb3]"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Card>
    </Link>
  )
}

export default ProductCard