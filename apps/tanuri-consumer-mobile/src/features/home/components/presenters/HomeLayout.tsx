import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "@/components/ui/scroll-view";
import { SearchBar } from "@/components/ui/searchbar";
import { textStyles } from "@/styles/text";
import ScreenHeader from "../../../../components/presenters/ScreenHeader";
import CartListingLayout from "../../../cart/components/layouts/CartListingLayout";
import ChecktoutFooter from "../../../cart/components/presenters/ChecktoutFooter";
import AddressRadioGroup from "../../../checktout/components/presenters/AddressRadioGroup";
import PaymentMethodRadioGroup from "../../../checktout/components/presenters/PaymentMethodRadioGroup";
import OrderHistoryAddressCard from "../../../order-history/components/presenters/OrderHistoryAddressCard";
import OrderHistoryCard, {
  DeliveryStatus,
} from "../../../order-history/components/presenters/OrderHistoryCard";
import OrderSummary from "../../../order-history/components/presenters/OrderSummary";
import ProductDetailDisplay from "../../../product-detail/components/presenters/ProductDetailDisplay";
import ProductDetailInfo from "../../../product-detail/components/presenters/ProductDetailInfo";
import type { ProductListingCardProps } from "../../../product-listing/components/presenters/ProductListingCard";
import ProductListingLayout from "../../../product-listing/components/presenters/ProductListingLayout";
import ProductCategoryCard from "./ProductCategoryCard";
import SpecialOffersCard from "./SpecialOffersCard";

const HomeLayout = () => {
  const productCardConfig = [
    {
      imageUrl: require("public/assets/burners.png"),
      categoryName: "burners",
    },
    {
      imageUrl: require("public/assets/cylinders.png"),
      categoryName: "cylinders",
    },
    {
      imageUrl: require("public/assets/regulator.png"),
      categoryName: "regulators",
    },
  ];
  const productListingConfig: ProductListingCardProps[] = [
    {
      imageUrl: require("public/assets/burners.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
    {
      imageUrl: require("public/assets/cylinders.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
    {
      imageUrl: require("public/assets/cylinders.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
    {
      imageUrl: require("public/assets/cylinders.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
  ];

  const specialOfferConfig = {
    imageUrl: require("public/assets/cylinders.png"),
    productCategory: "cylinders",
    percenageOff: 30,
  };
  const dummyVariants = [
    {
      name: "Size",
      variants: [
        { id: 1, name: "6 kg" },
        { id: 2, name: "13 kg" },
        { id: 3, name: "50 kg" },
      ],
    },
  ];

  const dummyOrders = [
    {
      deliveryDate: "2025-09-25",
      orderNumber: "12345",
      deliveryStatus: DeliveryStatus.delivered,
      products: [
        { id: 1, name: "Apples", quantity: 2, cost: 200 },
        { id: 2, name: "Bananas", quantity: 5, cost: 150 },
        { id: 3, name: "Oranges", quantity: 3, cost: 300 },
      ],
    },
    {
      deliveryDate: "2025-09-28",
      orderNumber: "67890",
      deliveryStatus: DeliveryStatus.inProgress,
      products: [
        { id: 4, name: "Milk", quantity: 1, cost: 120 },
        { id: 5, name: "Bread", quantity: 2, cost: 80 },
        { id: 6, name: "Eggs", quantity: 12, cost: 240 },
      ],
    },
  ];
  return (
    <SafeAreaView style={{ paddingHorizontal: 6, gap: 12 }}>
      {/* <FlatList
        data={dummyOrders}
        keyExtractor={(item) => item.orderNumber}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => <OrderHistoryCard {...item} />}
      />
      <OrderSummary
        deliveryDate="2025-09-28"
        orderNumber="67890"
        deliveryStatus={DeliveryStatus.inProgress}
      />
      <OrderHistoryAddressCard />
      <PaymentMethodRadioGroup /> */}
      {/* <AddressRadioGroup />
      <ChecktoutFooter buttonText="make payment" />
      <ScrollView
        contentContainerStyle={{
          gap: 16,
        }}
        style={{
          marginBottom: 16,
          paddingHorizontal: 8,
        }}
      >
        <PageHeader pageTitle="Product detail" />
    
        <ProductDetailDisplay
          imageUrl={require("public/assets/regulator.png")}
        />
        <ProductDetailInfo
          productName={"Wells gas"}
          variants={dummyVariants}
          productDescription={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus facere inventore similique repudiandae"
          }
          productPrice={1200}
        />

      </ScrollView>
      
      */}
      <ScreenHeader screenTitle="Product detail" />
      <CartListingLayout products={productListingConfig} />
      <ChecktoutFooter buttonText="make payment" />

      {/* <ProductDetailDisplay imageUrl={require("public/assets/regulator.png")} />
      <ProductDetailInfo
        productName={"Wells gas"}
        variants={dummyVariants}
        productDescription={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus facere inventore similique repudiandae"
        }
        productPrice={1200}
      /> */}

      {/* <SearchBar
        placeholder="What are you looking for"
        inputStyle={[textStyles.normal]}
      />
      <SpecialOffersCard
        productCategory={specialOfferConfig.productCategory}
        imageUrl={specialOfferConfig.imageUrl}
        percentageOff={specialOfferConfig.percenageOff}
      />
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          gap: 12,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {productCardConfig.map((category, index) => (
          <ProductCategoryCard
            key={`${index}-${category.categoryName}`}
            categoryName={category.categoryName}
            imageUrl={category.imageUrl}
          />
        ))}
      </ScrollView>
      <ProductListingLayout products={productListingConfig} /> */}
    </SafeAreaView>
  );
};

export default HomeLayout;
