import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateProduct } from "../../api/ProductsService";

interface IProps {
  isUpdateModalOpen: boolean;
  onClose: () => void;
  getAllProducts: () => void;
  dataEdit: any;
}

const UpdateUserModel = (props: IProps) => {
  const { isUpdateModalOpen, onClose, getAllProducts, dataEdit } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (dataEdit) {
      setName(dataEdit.name || "");
      setPrice(dataEdit.price || 0);
      setDescription(dataEdit.product_detail?.description || "");
      setManufacturer(dataEdit.product_detail?.manufacturer || "");
      setStock(dataEdit.product_detail?.stock || 0);
    }
  }, [dataEdit]);

  const handleOk = async () => {
    if (!name || price <= 0) {
      notification.error({
        message:
          "Tên và giá sản phẩm không được bỏ trống hoặc giá phải lớn hơn 0",
      });
      return;
    }

    const updatedData = {
      ...dataEdit,
      name,
      price,
      details: {
        ...dataEdit.details,
        description,
        manufacturer,
        stock,
      },
    };
    const res = await updateProduct(updatedData);
    if (res.data) {
      notification.success({
        message: "Cập nhật sản phẩm thành công",
      });
    }
    getAllProducts();
    onClose();
  };

  return (
    <>
      <Modal
        title="Update Product"
        open={isUpdateModalOpen}
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
    </>
  );
};

export default UpdateUserModel;
