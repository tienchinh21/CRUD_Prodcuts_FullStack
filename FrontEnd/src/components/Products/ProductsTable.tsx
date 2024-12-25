import { Button, message, Popconfirm, PopconfirmProps, Table } from "antd";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  getAllProducts,
  getProductDetail,
} from "../../api/ProductsService";
import { ColumnType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import CreateUserModel from "./CreateProductModel";
import UpdateUserModel from "./UpdateProductModel";

const ProductsTable = () => {
  const [listProducts, setListProducts] = useState<IProduct[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState<IProduct | null>(null);

  const showModal = () => {
    setCreateModalOpen(true);
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
  };

  const loadProducts = async () => {
    try {
      const res = await getAllProducts();
      const productsWithIds = res.data.map(
        (product: IProduct, index: number) => ({
          ...product,
          autoId: index + 1,
        })
      );
      setListProducts(productsWithIds);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const res = await getProductDetail(id);
      setDataEdit(res.data);
      setUpdateModalOpen(true);
    } catch (error) {}
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteProduct(id);
      if (res.data) {
        loadProducts();
        message.success("Xóa thành công");
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const columns: ColumnType<IProduct>[] = [
    {
      title: "STT",
      dataIndex: "autoId",
      key: "autoId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      },
    },
    {
      title: "Action",
      key: "action",
      render: (value, record) => (
        <div className="action" style={{ display: "flex", gap: 20 }}>
          <Button onClick={() => handleEdit(record.id)} type="default">
            Edit
          </Button>
          <Popconfirm
            title="Delete the user"
            description={`Bạn có chắc chắn muốn xóa sản phẩm tên : ${record.name}? `}
            onConfirm={() => handleDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Products</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Create Product
        </Button>
      </div>
      <Table dataSource={listProducts} columns={columns} />
      <CreateUserModel
        isCreateModalOpen={isCreateModalOpen}
        onClose={handleModalClose}
        getAllProducts={loadProducts}
      />
      <UpdateUserModel
        isUpdateModalOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        getAllProducts={loadProducts}
        dataEdit={dataEdit}
      />
    </>
  );
};

export default ProductsTable;
