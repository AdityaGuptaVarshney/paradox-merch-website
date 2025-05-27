import React, {useState} from 'react';
import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import Header from '../../components/layout/Header';
import {useCart} from '@/context/CartContext';
import toast from 'react-hot-toast';
import {gql} from '@apollo/client';
import {client} from '@/lib/apollo';
import Gallery from '@/components/gallery';
import {Product} from '@/utils/gql.generated';


interface ProductPageProps {
    product: Product;
}


const GET_ALL_PRODUCTS = gql`
    query GetAllProducts {
        ProductQuery {
            edges {
                node {
                    id
                }
            }
        }
    }
`;

const GET_PRODUCT_BY_ID = gql`
    query GetProductById {
        ProductQuery {
            edges {
                node {
                    id
                    code
                    name
                    price
                    category
                    shortDescription
                    longDescription
                    variants {
                        variant
                        id
                        quantity
                    }
                    images {
                        imageURL
                    }
                }
            }
        }
    }
`;

const ProductPage: NextPage<ProductPageProps> = ({product}) => {
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState(product.images?.[0]?.imageURL || '');
    const router = useRouter();
    const {addToCart} = useCart();

    if (!product) return null;

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size');
            return;
        }

        // Find the selected variant to get its ID
        const selectedVariant = product.variants.find(v => v.variant === selectedSize);

        if (!selectedVariant) {
            toast.error('Selected size is not available');
            return;
        }

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            salePrice: product.price * 1.2,
            image: product.images?.[0]?.imageURL ? (product.images[0].imageURL.startsWith('http') ? product.images[0].imageURL : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[0].imageURL.replace(/^\/+/, '')}`) : '',
            size: selectedSize,
            quantity: 1,
            type: 'product'
        }, selectedVariant.id);

        toast.success('Added to cart!');
        router.push('/cart');
    };

    return (
        <>
            <Head>
                <title>{product.name} - Paradox Merch Store</title>
                <meta name="description" content={product.name}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="min-h-screen mt-39 bg-[#121212]">
                <Header/>
                <div className="container mx-auto px-4 sm:px-10 pt-24 -mt-15 pb-10 sm:pt-25 lg:py-20">
                    {/* Back Button - Mobile Only
          <Link href="/shop" className="inline-flex items-center text-gray-400 hover:text-white mb-6 sm:hidden">
            <img src="/icons/back.svg" alt="back" className="w-8 h-8 mr-2" />
            <span>Back to Shop</span>
          </Link> */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                        {/* Left Column - Mobile: Gallery & Info, Desktop: Info only */}
                        <div className="flex flex-col space-y-6">
                            {/* Mobile Preview - Shown only on mobile */}
                            <div
                                className="block lg:hidden relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#121212]">
                                <Image
                                    src={selectedImage.startsWith('http') ? selectedImage : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedImage.replace(/^\/+/, '')}`}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Mobile Gallery - Shown only on mobile */}
                            <div className="grid grid-cols-3 gap-3 lg:hidden">
                                {product.images?.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(img.imageURL.startsWith('http') ? img.imageURL : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${img.imageURL.replace(/^\/+/, '')}`)}
                                        className={`relative aspect-square overflow-hidden rounded-xl bg-[#1A1A1A] ${
                                            selectedImage === img.imageURL ? 'ring-2 ring-[#F0CC0E]' : ''
                                        }`}
                                    >
                                        <Image
                                            src={img.imageURL.startsWith('http') ? img.imageURL : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${img.imageURL.replace(/^\/+/, '')}`}
                                            alt={`${product.name} view ${index + 1}`}
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Desktop Gallery - Hidden on mobile */}
                            {/* <div className="hidden lg:flex gap-4 overflow-x-hidden pb-4 scrollbar-hide p-4">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative flex-shrink-0 w-[180px] h-[230px] overflow-hidden rounded-xl ${
                      selectedImage === img ? 'ring-2 ring-[#F0CC0E]' : ''
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover object-top"
                    />
                  </button>
                ))}
              </div> */}
                            <Gallery
                                product={product}
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                            />
                            {/* Product Info */}
                            <div className="space-y-6">
                                {/* Price Tag */}
                                <div className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A]/60 px-4 py-2">
                                    {product.price ? (
                                        <>
                                            <span
                                                className="text-xl font-semibold text-[#F0CC0E]">₹ {product.price}</span>
                                            <span
                                                className="text-sm text-gray-400 line-through">₹ {product.price * 1.2}</span>
                                            <span
                                                className="text-xs font-medium text-[#F12F2F] bg-[#1A1A1A] px-2 py-1 rounded-full">
                        early bird price
                      </span>
                                        </>
                                    ) : (
                                        <span className="text-xl font-semibold text-white">Rs {product.price}</span>
                                    )}
                                </div>

                                {/* Product Name and Description */}
                                <div>
                                    <h1 className="text-2xl font-bold text-white mb-2">{product.name}</h1>
                                    <p className="text-gray-400">{product.shortDescription}</p>
                                </div>

                                {/* Size Selection */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex flex-start justify-center align-center items-center gap-5">
                                            <h3 className="text-sm font-medium text-white">sizes</h3>
                                            <div className="flex gap-3">
                                                {product.variants.map((size) => (
                                                    <button
                                                        key={size.variant}
                                                        onClick={() => setSelectedSize(size.variant)}
                                                        className={`h-10 sm:h-12 w-10 sm:w-12 rounded-full border ${
                                                            selectedSize === size.variant
                                                                ? 'border-[#F0CC0E] bg-[#F0CC0E] text-black'
                                                                : 'border-[#2A2A2A] bg-[#1A1A1A] text-white hover:border-[#F0CC0E]'
                                                        } text-sm font-medium transition-colors`}
                                                    >
                                                        {size.variant}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="text-sm text-[#F0CC0E] hover:underline">
                                            size chart
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-[#F0CC0E] text-black font-semibold py-3 sm:py-4 rounded-full hover:bg-[#F0CC0E]/90 transition-colors"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Main Preview (Desktop Only) */}
                        <div className="hidden lg:block w-[85%] aspect-[1/1] ml-12">
                            <div
                                className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#121212]">
                                <Image
                                    src={selectedImage ? (selectedImage.startsWith('http') ? selectedImage : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedImage.replace(/^\/+/, '')}`) : '/placeholder.png'}
                                    alt={product.name}
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const {data} = await client.query({query: GET_ALL_PRODUCTS});

    const paths =
        data?.ProductQuery?.edges?.map((edge: any) => ({
            params: {id: edge.node.id},
        })) ?? [];

    return {
        paths,
        fallback: 'blocking', // ← ✅ IMPORTANT CHANGE
    };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({params}) => {
    const {data} = await client.query({query: GET_PRODUCT_BY_ID});

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8082';

    const node = data?.ProductQuery?.edges.find((edge: any) => edge.node.id === params?.id)?.node;

    if (!node) {
        return {notFound: true};
    }

    const imageUrl = node.images?.[0]?.imageURL
        ? node.images[0].imageURL.startsWith('http')
            ? node.images[0].imageURL
            : `${backendUrl}/${node.images[0].imageURL.replace(/^\/+/, '')}`
        : '/images/placeholder.png';

    const gallery = node.images?.map((img: any) =>
        img.imageURL.startsWith('http')
            ? img.imageURL
            : `${backendUrl}/${img.imageURL.replace(/^\/+/, '')}`
    ) ?? [];

    const product: Product = node;

    return {
        props: {
            product,
        },
    };
};

export default ProductPage;
