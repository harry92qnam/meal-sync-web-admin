import { FOOD_STATUS, SHOP_STATUS } from '@/data/constants/constants';
import FoodModel from '@/types/models/FoodModel';
import { formatCurrency, formatNumber, isLocalImage } from '@/utils/MyUtils';
import { Card, Chip } from '@nextui-org/react';
import Image from 'next/image';

export default function Food({
  name,
  price,
  imageUrl,
  description,
  status,
  totalOrder,
}: Omit<FoodModel, 'id'>) {
  return (
    <Card radius="sm" className="flex flex-row py-2 px-4 justify-between">
      <div className="flex flex-col">
        <Chip
          className={`capitalize my-2 ${
            status === 1 ? 'bg-green-200 text-green-600' : 'bg-gray-200 text-gray-600'
          }`}
          size="sm"
          variant="flat"
        >
          {FOOD_STATUS.find((item) => item.key === status)?.desc}
        </Chip>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm">{description}</p>
        <p>
          Giá bán: <span className="text-primary font-bold text-lg">{formatCurrency(price)}</span>
        </p>
        <p>
          Số lượng sản phẩm đã bán:{' '}
          <span className="font-bold text-lg">{formatNumber(totalOrder)}</span>
        </p>
      </div>
      {!isLocalImage(imageUrl || '') && (
        <Image
          src={imageUrl ?? ''}
          width={120}
          height={120}
          alt="image product"
          loading="lazy"
          quality={100}
          className="object-cover w-36 h-36 rounded-2xl"
        />
      )}
    </Card>
  );
}
