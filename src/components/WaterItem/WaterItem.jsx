import { useState } from 'react';
import css from '../WaterItem/WaterItem.module.css';
import WaterModal from '../../shared/components/WaterModal/WaterModal';
import Modal from '../../shared/components/Modal/Modal';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal';
import Icon from '../../shared/components/Icon/Icon';


export default function WaterItem() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };


  return (
    <>
    <ul className={css.list_water_items}>
      {Array(15).fill(null).map((_, index) => (
        <li key={index} className={css.water_item}>
        <div className={css.water_item_content}>
          <img src="path_to_icon" alt="water" />
          <div>
            <strong>250 ml</strong>
            <p>7:00 AM</p>
          </div>
          <div className={css.container_buttons}>
          <button className={css.editButton} onClick={handleEdit}> <Icon className={css.svg_edit} width={16} height={16} id="eye"/> </button>
          <button className={css.deleteButton} onClick={handleDelete}> <Icon className={css.svg_delete} width={16} height={16} id="eye"/> </button>
          </div>
        </div>
      </li>
    ))}
  </ul>
  {isEditModalOpen && (
    <Modal>
      <WaterModal />
    </Modal>
  )}
  {isDeleteModalOpen && (
    <Modal>
      <DeleteWaterModal />
    </Modal>
  )}
    </>
  );
}
