'use client'

import { useState, useEffect } from 'react'
import { Menu, X, AlertTriangle, Wheat, ShoppingBag, Heart, Phone, Check, CheckCircle2, ShoppingBasket, Plus, Minus, Trash2, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '96541447647'
const DISCOUNT_PERCENTAGE = 25
const DISCOUNT_THRESHOLD = 2

interface AddOn {
  id: number
  name: string
  description: string
  price: number
  image: string
}

interface BasketItem {
  id: number
  quantity: number
  addOns: number[]
}

const products = [
  {
    id: 1,
    name: 'بريوش',
    price: 18,
    priceUnit: 'د.ك',
    tag: 'الأكثر طلباً',
    description: 'بريوش فاخر بالزبدة الطبيعية، هش وطري، يجنن مع الريوق والسندويشات',
    image: '/brioche.jpg',
    tagColor: 'bg-primary'
  },
  {
    id: 2,
    name: 'توست',
    price: 10,
    priceUnit: 'د.ك',
    tag: 'كلاسيكي',
    description: 'توست أبيض ناعم على الطريقة الأصلية، مثالي للريوق والفرنش توست',
    image: '/toast.jpg',
    tagColor: 'bg-secondary'
  },
  {
    id: 3,
    name: 'توست صحي',
    price: 10,
    priceUnit: 'د.ك',
    tag: 'صحي',
    description: 'توست حبوب كاملة مع بذور مغذية، خيارك الصحي اللذيذ',
    image: '/healthy-toast.jpg',
    tagColor: 'bg-accent'
  }
]

const addOns: AddOn[] = [
  {
    id: 1,
    name: 'بذور الكتان',
    description: 'غنية بالأوميغا 3، ممتازة لصحة القلب',
    price: 0.5,
    image: '/flax-seeds.jpg'
  },
  {
    id: 2,
    name: 'بذور الشيا',
    description: 'سوبر فود يعطيك طاقة ونشاط طول اليوم',
    price: 0.75,
    image: '/chia-seeds.jpg'
  },
  {
    id: 3,
    name: 'بذور دوار الشمس',
    description: 'قرمشة لذيذة مع فيتامين E الطبيعي',
    price: 0.5,
    image: '/sunflower-seeds.jpg'
  },
  {
    id: 4,
    name: 'الجوز',
    description: 'غذاء الدماغ، غني بالأحماض الدهنية المفيدة',
    price: 1,
    image: '/walnuts.jpg'
  },
  {
    id: 5,
    name: 'اللوز',
    description: 'بروتين ودهون صحية تخليك شبعان أكثر',
    price: 1,
    image: '/almonds.jpg'
  },
  {
    id: 6,
    name: 'بذور اليقطين',
    description: 'مغنيسيوم وزنك لتقوية المناعة',
    price: 0.75,
    image: '/pumpkin-seeds.jpg'
  },
  {
    id: 7,
    name: 'القرفة',
    description: 'نكهة رهيبة وتساعد بتنظيم السكر',
    price: 0.25,
    image: '/cinnamon.jpg'
  },
  {
    id: 8,
    name: 'العسل الطبيعي',
    description: 'حلاوة طبيعية بدال السكر',
    price: 1,
    image: '/honey.jpg'
  },
  {
    id: 9,
    name: 'الموز أو التوت',
    description: 'فيتامينات ولون يفتح النفس',
    price: 0.75,
    image: '/fruits.jpg'
  },
  {
    id: 10,
    name: 'جوز الهند المبشور',
    description: 'قرمشة استوائية مميزة',
    price: 0.75,
    image: '/coconut.jpg'
  },
  {
    id: 11,
    name: 'الزبادي أو زبدة الفول السوداني',
    description: 'بروتين إضافي يخلي التوست مشبع',
    price: 0.5,
    image: '/peanut-butter.jpg'
  }
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [basketOpen, setBasketOpen] = useState(false)
  const [addOnsModalOpen, setAddOnsModalOpen] = useState(false)
  const [selectedProductForAddOns, setSelectedProductForAddOns] = useState<number | null>(null)
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [basket, setBasket] = useState<BasketItem[]>([])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const getBasketItemCount = () => {
    return basket.reduce((total, item) => total + item.quantity, 0)
  }

  const openAddOnsModal = (productId: number) => {
    setSelectedProductForAddOns(productId)
    setSelectedAddOns([])
    setAddOnsModalOpen(true)
  }

  const closeAddOnsModal = () => {
    setAddOnsModalOpen(false)
    setSelectedProductForAddOns(null)
    setSelectedAddOns([])
  }

  const toggleAddOn = (addOnId: number) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    )
  }

  const addToBasket = (productId: number, withAddOns: number[] = []) => {
    setBasket(prev => {
      const existing = prev.find(item => item.id === productId)
      if (existing && withAddOns.length === 0) {
        return prev.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { id: productId, quantity: 1, addOns: withAddOns }]
    })
    closeAddOnsModal()
  }

  const removeFromBasket = (index: number) => {
    setBasket(prev => prev.filter((_, i) => i !== index))
  }

  const updateQuantity = (index: number, change: number) => {
    setBasket(prev => {
      return prev
        .map((item, i) => {
          if (i === index) {
            const newQuantity = Math.max(1, item.quantity + change)
            return { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter(item => item.quantity > 0)
    })
  }

  const getBasketItems = () => {
    return basket.map((basketItem, index) => {
      const product = products.find(p => p.id === basketItem.id)
      const itemAddOns = basketItem.addOns.map(addOnId =>
        addOns.find(a => a.id === addOnId)
      ).filter(Boolean)
      const addOnsTotal = itemAddOns.reduce((sum, addOn) => sum + addOn.price, 0)
      return { ...product, quantity: basketItem.quantity, addOns: itemAddOns, addOnsTotal, basketIndex: index }
    }).filter(Boolean)
  }

  const calculateTotal = () => {
    const basketItems = getBasketItems()
    const subtotal = basketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const addOnsTotal = basketItems.reduce((sum, item) => sum + (item.addOnsTotal * item.quantity), 0)
    const totalBeforeDiscount = subtotal + addOnsTotal
    const totalItems = getBasketItemCount()
    const discount = totalItems >= DISCOUNT_THRESHOLD ? (subtotal * DISCOUNT_PERCENTAGE) / 100 : 0
    return {
      subtotal,
      addOnsTotal,
      total: totalBeforeDiscount - discount,
      totalItems,
      discount
    }
  }

  const handleWhatsAppSubscribe = (productName: string) => {
    const message = `هلا والله، أبي أشترك في باقة ${productName} الشهرية`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const handleWhatsAppContact = () => {
    const message = 'هلا، أبي أستفسر عن منتجات Daily Bread'
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const handleCheckout = () => {
    const basketItems = getBasketItems()
    if (basketItems.length === 0) return

    const { subtotal, addOnsTotal, discount, total } = calculateTotal()

    let message = `هلا، أبي أشترك شهري في:`
    basketItems.forEach(item => {
      message += `\n- ${item.name} × ${item.quantity} (${item.price} ${item.priceUnit} لكل واحد)`
      if (item.addOns && item.addOns.length > 0) {
        message += `\n  • الإضافات: ${item.addOns.map(a => a.name).join('، ')}`
      }
    })
    message += `\n\nالمجموع (منتجات): ${subtotal.toFixed(2)} ${basketItems[0].priceUnit}`
    if (addOnsTotal > 0) {
      message += `\nمجموع الإضافات: ${addOnsTotal.toFixed(2)} ${basketItems[0].priceUnit}`
    }
    if (discount > 0) {
      message += `\nالخصم: ${discount.toFixed(2)} ${basketItems[0].priceUnit} (${DISCOUNT_PERCENTAGE}%)`
    }
    message += `\nالإجمالي بعد الخصم: ${total.toFixed(2)} ${basketItems[0].priceUnit}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    setBasketOpen(false)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  const { subtotal, addOnsTotal, discount, total, totalItems } = calculateTotal()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Wheat className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Daily Bread</h1>
              <p className="text-xs text-muted-foreground">خبزك الطازج كل يوم</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Basket Button */}
            <Sheet open={basketOpen} onOpenChange={setBasketOpen}>
              <SheetTrigger asChild aria-label="السلة">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  aria-label="افتح السلة"
                >
                  <ShoppingBasket className="h-6 w-6" />
                  {getBasketItemCount() > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                      {getBasketItemCount()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-96 flex flex-col">
                <SheetHeader>
                  <SheetTitle className="text-right flex items-center gap-2">
                    <ShoppingBasket className="h-5 w-5" />
                    سلتك
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto mt-6">
                  {basket.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <ShoppingBasket className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-lg">السلة فاضية</p>
                      <p className="text-muted-foreground text-sm mt-2">أضف منتجات وابدأ</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getBasketItems().map(item => (
                        <div
                          key={`${item.id}-${item.basketIndex}`}
                          className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg border border-border"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                            <p className="text-primary font-bold text-sm">{item.price} {item.priceUnit}</p>
                            {item.addOns && item.addOns.length > 0 && (
                              <div className="mt-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1 mb-1">
                                  <Info className="h-3 w-3" />
                                  <span>الإضافات:</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {item.addOns.map(addOn => (
                                    <Badge key={addOn.id} variant="outline" className="text-xs py-0 px-2">
                                      {addOn.name}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.basketIndex, -1)}
                                aria-label="قلل الكمية"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.basketIndex, 1)}
                                aria-label="زد الكمية"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeFromBasket(item.basketIndex)}
                              aria-label="احذف من السلة"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {basket.length > 0 && (
                  <div className="border-t border-border pt-4 mt-4 space-y-3">
                    <div className="flex items-center justify-between text-lg">
                      <span>مجموع المنتجات:</span>
                      <span className="font-semibold">{subtotal.toFixed(2)} {products[0].priceUnit}</span>
                    </div>

                    {addOnsTotal > 0 && (
                      <div className="flex items-center justify-between text-lg">
                        <span>الإضافات:</span>
                        <span className="font-semibold">{addOnsTotal.toFixed(2)} {products[0].priceUnit}</span>
                      </div>
                    )}

                    {discount > 0 && (
                      <>
                        <div className="flex items-center justify-between text-lg text-green-600 dark:text-green-400">
                          <span className="font-medium">الخصم ({DISCOUNT_PERCENTAGE}%):</span>
                          <span className="font-bold">-{discount.toFixed(2)} {products[0].priceUnit}</span>
                        </div>
                        <div className="flex items-center justify-between text-xl">
                          <span className="font-bold">الإجمالي:</span>
                          <span className="font-bold text-2xl text-primary">
                            {total.toFixed(2)} {products[0].priceUnit}
                          </span>
                        </div>
                        <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-3 text-center">
                          <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                            🎉 وفرت {discount.toFixed(2)} {products[0].priceUnit}!
                          </span>
                        </div>
                      </>
                    )}

                    <Button
                      size="lg"
                      className="w-full h-12 mt-4 min-h-[48px]"
                      onClick={handleCheckout}
                    >
                      أكمل الاشتراك
                      <Phone className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            {/* Mobile Menu */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild aria-label="القائمة">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="فتح القائمة"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 sm:w-80">
                <SheetHeader>
                  <SheetTitle className="text-right">القائمة</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4">
                  <a
                    href="#hero"
                    onClick={handleMenuClose}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 text-right"
                  >
                    الرئيسية
                  </a>
                  <a
                    href="#products"
                    onClick={handleMenuClose}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 text-right"
                  >
                    منتجاتنا
                  </a>
                  <a
                    href="#subscription"
                    onClick={handleMenuClose}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 text-right"
                  >
                    الاشتراك الشهري
                  </a>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      handleWhatsAppContact()
                      handleMenuClose()
                    }}
                  >
                    <Phone className="ml-2 h-4 w-4" />
                    كلمنا
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="القائمة الرئيسية">
            <a href="#hero" className="text-sm font-medium hover:text-primary transition-colors">
              الرئيسية
            </a>
            <a href="#products" className="text-sm font-medium hover:text-primary transition-colors">
              منتجاتنا
            </a>
            <a href="#subscription" className="text-sm font-medium hover:text-primary transition-colors">
              الاشتراك الشهري
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div
              className="space-y-6"
              style={{
                animation: !prefersReducedMotion ? 'fadeIn 0.6s ease-out' : 'none'
              }}
            >
              <Badge variant="secondary" className="mb-2">
                <ShoppingBag className="ml-2 h-4 w-4" />
                من مطبخنا لبيتك
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                خبز طازج{' '}
                <span className="text-primary">كل يوم</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                نوصلك أطيب خبز محضر بعناية وحب، توصيل مجاني لباب بيتك
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base min-h-[48px]"
                  onClick={() => handleWhatsAppSubscribe('بريوش')}
                >
                  اشترك الحين
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base min-h-[48px]"
                  onClick={() => window.location.href = '#products'}
                >
                  شوف المنتجات
                </Button>
              </div>

              {/* Subscription Summary */}
              <div
                id="subscription"
                className="bg-secondary/50 border border-border rounded-xl p-6 mt-6"
              >
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  اشتراك شهري
                </h3>
                <p className="text-muted-foreground text-base">
                  اشتراك شهري — نوصلك ٤ مرات بالأسبوع
                </p>
              </div>
            </div>

            <div
              className="relative"
              style={{
                animation: !prefersReducedMotion ? 'slideIn 0.8s ease-out' : 'none'
              }}
            >
              <div className="relative aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-bakery.jpg"
                  alt="خبزنا الطازج من المخبز"
                  className="object-cover w-full h-full"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discount Banner */}
      <section className="container mx-auto px-4 py-6">
        <Alert className="border-primary/50 bg-primary/5 dark:bg-primary/10 max-w-4xl mx-auto">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <AlertDescription className="text-base text-foreground font-medium">
            🎉 خصم {DISCOUNT_PERCENTAGE}% لما تشترك في {DISCOUNT_THRESHOLD} منتجات أو أكثر!
          </AlertDescription>
        </Alert>
      </section>

      {/* Allergen Alert */}
      <section className="container mx-auto px-4 py-6">
        <Alert className="border-yellow-400/50 bg-yellow-50/50 dark:bg-yellow-950/20 max-w-4xl mx-auto">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription className="text-base text-foreground font-medium">
            تنبيه: جميع أنواع الخبز تحتوي على جلوتين القمح ولاكتوز الحليب
          </AlertDescription>
        </Alert>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">منتجاتنا الطازجة</h2>
            <p className="text-muted-foreground text-lg">
              اختار منتجاتك وخصصها بإضافات صحية ولذيذة
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products.map((product, index) => {
              const itemInBasket = basket.find(item => item.id === product.id)
              const quantity = itemInBasket?.quantity || 0
              const shouldShowDiscount = totalItems >= DISCOUNT_THRESHOLD && quantity > 0
              const discountedPrice = shouldShowDiscount ? product.price * (1 - DISCOUNT_PERCENTAGE / 100) : product.price

              return (
                <Card
                  key={product.id}
                  className="flex flex-col h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                  style={{
                    animation: !prefersReducedMotion ? `fadeInUp 0.6s ease-out ${index * 0.15}s both` : 'none'
                  }}
                >
                  <CardHeader className="p-0">
                    <div className="relative aspect-square overflow-hidden bg-secondary/20">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                      <Badge className={`absolute top-3 right-3 ${product.tagColor} text-white`}>
                        {product.tag}
                      </Badge>
                      {quantity > 0 && (
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                          {quantity} بالسلة
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-2xl mb-3">{product.name}</CardTitle>
                    <CardDescription className="text-base mb-4 min-h-[3rem]">
                      {product.description}
                    </CardDescription>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-1 flex-wrap">
                        {shouldShowDiscount ? (
                          <>
                            <span className="text-3xl font-bold text-primary">
                              {discountedPrice.toFixed(2)}
                            </span>
                            <span className="text-muted-foreground">{product.priceUnit}</span>
                            <span className="text-muted-foreground text-sm mr-2">/ شهر</span>
                            <span className="text-sm text-muted-foreground line-through mr-2">
                              {product.price} {product.priceUnit}
                            </span>
                            <Badge className="bg-green-600 hover:bg-green-700">خصم {DISCOUNT_PERCENTAGE}%</Badge>
                          </>
                        ) : (
                          <>
                            <span className="text-3xl font-bold text-primary">{product.price}</span>
                            <span className="text-muted-foreground">{product.priceUnit}</span>
                            <span className="text-muted-foreground text-sm mr-2">/ شهر</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 space-y-2">
                    {quantity > 0 ? (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 h-12 min-h-[48px]"
                          onClick={() => updateQuantity(basket.findIndex(item => item.id === product.id), 1)}
                        >
                          <Plus className="ml-2 h-4 w-4" />
                          زيد واحد
                        </Button>
                        <Button
                          variant="default"
                          className="flex-1 h-12 min-h-[48px]"
                          onClick={() => setBasketOpen(true)}
                        >
                          <ShoppingBasket className="ml-2 h-4 w-4" />
                          شوف السلة
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          className="w-full h-12 text-base min-h-[48px] group"
                          onClick={() => openAddOnsModal(product.id)}
                          aria-label={`أضف إضافات إلى ${product.name}`}
                        >
                          <ShoppingBasket className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                          أضف للسلة مع إضافات
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full"
                          onClick={() => addToBasket(product.id, [])}
                        >
                          أضف بدون إضافات
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {/* Basket Summary Section */}
          {basket.length > 0 && (
            <div
              className="mt-12 max-w-2xl mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/50 border-2 border-primary/30 rounded-2xl p-8 shadow-xl"
              style={{
                animation: !prefersReducedMotion ? 'fadeIn 0.5s ease-out' : 'none'
              }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <ShoppingBasket className="h-7 w-7 text-primary" />
                سلتك
              </h3>

              <div className="space-y-4 mb-6">
                {getBasketItems().map(item => (
                  <div key={`${item.id}-${item.basketIndex}`} className="p-4 bg-background rounded-lg border border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-muted-foreground">الكمية: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-left shrink-0">
                        <span className="font-medium block">
                          {(item.price * item.quantity).toFixed(2)} {item.priceUnit}
                        </span>
                      </div>
                    </div>
                    {item.addOns && item.addOns.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <Info className="h-3 w-3" />
                          <span>الإضافات:</span>
                        </div>
                        <div className="space-y-2">
                          {item.addOns.map(addOn => (
                            <div key={addOn.id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <img
                                  src={addOn.image}
                                  alt={addOn.name}
                                  className="w-12 h-12 object-cover rounded-md shrink-0"
                                />
                                <span className="text-muted-foreground truncate">{addOn.name}</span>
                              </div>
                              <span className="font-medium shrink-0">{addOn.price.toFixed(2)} {products[0].priceUnit}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">مجموع الإضافات:</span>
                          <span className="font-semibold text-primary">
                            {(item.addOnsTotal * item.quantity).toFixed(2)} {products[0].priceUnit}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-lg">
                  <span>مجموع المنتجات:</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} {products[0].priceUnit}</span>
                </div>

                {addOnsTotal > 0 && (
                  <div className="flex items-center justify-between text-lg">
                    <span>الإضافات:</span>
                    <span className="font-semibold">{addOnsTotal.toFixed(2)} {products[0].priceUnit}</span>
                  </div>
                )}

                {discount > 0 && (
                  <>
                    <div className="flex items-center justify-between text-lg text-green-600 dark:text-green-400">
                      <span className="font-medium">الخصم ({DISCOUNT_PERCENTAGE}%):</span>
                      <span className="font-bold">-{discount.toFixed(2)} {products[0].priceUnit}</span>
                    </div>
                    <div className="flex items-center justify-between text-xl">
                      <span className="font-bold">الإجمالي:</span>
                      <span className="font-bold text-2xl text-primary">
                        {total.toFixed(2)} {products[0].priceUnit}
                      </span>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4 text-center">
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        🎉 توفرت {discount.toFixed(2)} {products[0].priceUnit}!
                      </span>
                    </div>
                  </>
                )}

                {totalItems < DISCOUNT_THRESHOLD && (
                  <p className="text-center mt-4 text-sm text-muted-foreground">
                    💡 أضف {DISCOUNT_THRESHOLD - totalItems} منتجات إضافية للحصول على خصم {DISCOUNT_PERCENTAGE}%
                  </p>
                )}

                <Button
                  size="lg"
                  className="w-full h-14 text-lg mt-6 min-h-[56px]"
                  onClick={handleCheckout}
                >
                  أكمل الاشتراك
                  <Phone className="mr-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/40 bg-secondary/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Wheat className="h-5 w-5 text-primary" />
              <span className="font-semibold">Daily Bread</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Daily Bread. جميع الحقوق محفوظة.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWhatsAppContact}
              className="gap-2 min-h-[44px]"
            >
              <Phone className="h-4 w-4" />
              كلمنا
            </Button>
          </div>
        </div>
      </footer>

      {/* WhatsApp Sticky CTA */}
      <Button
        className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-2xl bg-green-600 hover:bg-green-700 text-white z-50 flex items-center justify-center p-0 min-h-[56px] min-w-[56px]"
        onClick={handleWhatsAppContact}
        aria-label="كلمنا على الواتساب"
        style={{
          animation: !prefersReducedMotion ? 'bounceIn 0.5s ease-out 1s both' : 'none'
        }}
      >
        <Phone className="h-6 w-6" />
      </Button>

      {/* Add-ons Modal */}
      <Sheet open={addOnsModalOpen} onOpenChange={setAddOnsModalOpen}>
        <SheetContent side="left" className="w-full sm:w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-right">اختار إضافاتك</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {selectedProductForAddOns && (() => {
              const product = products.find(p => p.id === selectedProductForAddOns)
              return (
                <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-semibold">{product?.name}</h4>
                      <p className="text-primary font-bold">{product?.price} {product?.priceUnit}</p>
                    </div>
                  </div>
                </div>
              )
            })()}

            <div className="space-y-3">
              {addOns.map(addOn => {
                const isSelected = selectedAddOns.includes(addOn.id)
                return (
                  <div
                    key={addOn.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-secondary/30'
                    }`}
                    onClick={() => toggleAddOn(addOn.id)}
                  >
                    <img
                      src={addOn.image}
                      alt={addOn.name}
                      className="w-20 h-20 object-cover rounded-md shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleAddOn(addOn.id)}
                          className="mt-0"
                        />
                        <div className="flex items-center gap-2 flex-1">
                          <span className="font-semibold">{addOn.name}</span>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {addOn.price.toFixed(2)} {products[0].priceUnit}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{addOn.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-border pt-4 mt-6 space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 min-h-[48px]"
                onClick={() => {
                  if (selectedProductForAddOns) {
                    addToBasket(selectedProductForAddOns, [])
                  }
                }}
              >
                أضف بدون إضافات
              </Button>
              <Button
                size="lg"
                className="w-full h-12 min-h-[48px]"
                onClick={() => {
                  if (selectedProductForAddOns) {
                    addToBasket(selectedProductForAddOns, selectedAddOns)
                  }
                }}
                disabled={selectedAddOns.length === 0}
              >
                أضف إلى السلة
                <ShoppingBasket className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Custom Styles for Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  )
}
