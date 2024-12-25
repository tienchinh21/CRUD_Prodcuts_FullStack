import { Input, Modal, notification } from "antd";
import { useState } from "react";
import { createProduct } from "../../api/ProductsService";

interface IProduct {
  isCreateModalOpen: boolean;
  onClose: () => void;
  getAllProducts: () => void;
}

const CreateUserModel = (props: IProduct) => {
  const { isCreateModalOpen, onClose, getAllProducts } = props;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [stock, setStock] = useState(0);

  const handleOk = async () => {
    if (!name || price <= 0 || stock <= 0) {
      notification.error({
        message: "Bạn cần phải nhập đầy đủ thông tin",
        description:
          "Tên sản phẩm không được bỏ trống, Giá và số lượng tồn kho phải lớn hơn 0",
      });
      return;
    }

    const data = {
      id: "",
      name,
      price,
      details: {
        id: "",
        product_id: "",
        description,
        manufacturer,
        stock,
      },
    };

    const res = await createProduct(data);

    if (res.EC === 0) {
      notification.success({
        message: "Tạo sản phẩm thành công",
      });
      getAllProducts();
      onClose();
    } else {
      notification.error({
        message: res.data?.message || "Tạo sản phẩm thất bại",
      });
    }
  };

  return (
    <Modal
      title="Create Product"
      open={isCreateModalOpen}
      onOk={handleOk}
      onCancel={onClose}
      maskClosable={false}
    >
      <div>
        <div>Name:</div>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <div>Price:</div>
        <Input
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <div>Description:</div>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <div>Manufacturer:</div>
        <Input
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
        />
      </div>
      <div>
        <div>Stock:</div>
        <Input
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />
      </div>
    </Modal>
  );
};

export default CreateUserModel;
