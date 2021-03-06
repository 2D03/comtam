import { SectionSubHeading } from "components/misc/Headings.js";
import {
  actions as cartAction,
  useCartDispatchState,
  useCartState,
} from "contexts/cart";
import {
  actions as stepsAction,
  useStepsDispatchState,
  useStepsState,
} from "contexts/steps";
import { ReactComponent as SubtractIcon } from "feather-icons/dist/icons/minus.svg";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import numeral from "numeral";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Heading = tw(SectionSubHeading)`lg:text-left text-primary-500`;

const Menu = tw.dl`mt-2`;
const Count = tw.span`font-semibold`;
const Dishes = tw.div`mt-2 select-none border lg:border-0 px-8 py-2 lg:p-0 rounded-lg lg:rounded-none`;
const FlexContainer = tw.div`flex justify-between items-center`;
const DishName = tw.span`text-sm font-semibold`;
const DishPrice = tw.span`text-sm font-semibold`;
const AddIcon = styled.span`
  ${tw`mx-2 bg-green-500 text-gray-100 p-1 hover:bg-green-700 hover:text-gray-200 transition duration-300`}
  svg {
    ${tw`w-2 h-2`}
  }
`;
const MinusIcon = styled.span`
  ${tw`mx-2 bg-gray-500 text-gray-100 p-1 hover:bg-gray-700 hover:text-gray-200 transition duration-300`}
  svg {
    ${tw`w-2 h-2`}
  }
`;
const TotalText = tw.div`py-2 text-primary-500`;
const Items = tw.div`py-2`;
const Button = tw.button`bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded w-full`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 py-2 my-2 transform -skew-x-12 inline-block`;
const SideColumn = styled.div`
  ${tw`lg:block p-6 sticky self-start top-0 block`}
  border: 1px solid #e8e9eb;
  box-shadow: 0 0 1px 1px rgba(20, 23, 28, 0.1),
    0 3px 1px 0 rgba(20, 23, 28, 0.1);
`;
const Divider = styled.hr`
  border-top: 3px dashed #bbb;
`;
const ShippingFee = tw.div`pt-2 line-through`;
const ShippingFeeText = tw.div`pb-2`;
export default () => {
  const cart = useCartState();
  const dispatch = useCartDispatchState();
  const { currentStep } = useStepsState();
  const stepsDispatch = useStepsDispatchState();
  const totalAmount = cart.items.reduce((acc, item) => {
    return (acc += item.quatity * item.price);
  }, 0);

  const onClickNextStep = () => {
    if (currentStep === 0) {
      stepsDispatch({ type: stepsAction.nextStep });
    } else if (currentStep === 1) {
      const submitBtn = document.getElementById("shipping-submit-btn");
      if (submitBtn) submitBtn.click();
    }
  };
  return cart.items.length > 0 ? (
    <SideColumn>
      <Menu>
        <Heading>Tóm tắt</Heading>
        <Items>
          {cart.items.map((dish, index) => (
            <React.Fragment key={index}>
              <Dishes className="group">
                <FlexContainer>
                  <FlexContainer>
                    <AddIcon
                      onClick={() =>
                        dispatch({
                          type: cartAction.addItem,
                          dish,
                        })
                      }
                    >
                      <PlusIcon />
                    </AddIcon>
                    <Count>{dish.quatity}</Count>
                    <MinusIcon
                      onClick={() =>
                        dispatch({
                          type: cartAction.removeItem,
                          dish,
                        })
                      }
                    >
                      <SubtractIcon />
                    </MinusIcon>
                    <DishName>{dish.title}</DishName>
                  </FlexContainer>
                  <DishPrice>
                    {numeral(dish.price).format("0,0") + "đ"}
                  </DishPrice>
                </FlexContainer>
                <FlexContainer>
                  <span>Cộng</span>
                  <span>
                    {numeral(parseInt(dish.price) * dish.quatity).format(
                      "0,0"
                    ) + " VNĐ"}
                  </span>
                </FlexContainer>
              </Dishes>
            </React.Fragment>
          ))}
        </Items>
        <Divider />
        <FlexContainer>
          <ShippingFeeText>Phí giao hàng</ShippingFeeText>
          <ShippingFee>{numeral(15000).format("0,0") + " VNĐ"}</ShippingFee>
        </FlexContainer>
        <FlexContainer>
          <TotalText>Tổng cộng</TotalText>
          <HighlightedText>
            {numeral(totalAmount).format("0,0") + " VNĐ"}
          </HighlightedText>
        </FlexContainer>
        <Button onClick={onClickNextStep}>
          {currentStep === 1 ? "Hoàn tất" : "Đặt ngay!"}
        </Button>
      </Menu>
    </SideColumn>
  ) : null;
};
