import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "BOOK";

const DraggableItem = ({ item, index, moveItem }) => {
    const ref = React.useRef(null);

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index === index) return;
            moveItem(draggedItem.index, index);
            draggedItem.index = index;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <li
            ref={ref}
            className="item-card"
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: "move",
            }}
        >
            <img src={item.thumbnail} alt={item.title} />
            <h3>{item.title}</h3>
            <p>By {item.authors.join(", ")}</p>
        </li>
    );
};

const ItemList = ({ items, updateItems }) => {
    const moveItem = (fromIndex, toIndex) => {
        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);
        updateItems(updatedItems);
    };

    return (
        <ul className="item-list">
            {items.map((item, index) => (
                <DraggableItem
                    key={item.id}
                    item={item}
                    index={index}
                    moveItem={moveItem}
                />
            ))}
        </ul>
    );
};

export default ItemList;
