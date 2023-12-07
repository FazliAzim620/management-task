import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DraggableTable = ({ updateChanges, data,  }) => {
    const [items, setItems] = useState([...data]);
  
    const handleDragEnd = (result) => {
      if (!result.destination) return;
      const newItems = Array.from(items);
      const [reorderedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedItem);
  
      setItems(newItems);
    };
  
    return (
      <>
        <div className="relative h-[70vh] bg-white mb-2">
          <div className="h-[100%] overflow-y-auto ">
            <div className="w-full mt-[3rem]">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="table">
                  {(provided) => (
                    <table
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-w-full divide-y divide-gray-200"
                    >
                      <thead className="bg-gray-200" style={{ position: "sticky", top: "2.5rem", zIndex: 1 }}>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs w-[30%] font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left w-[30%] text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs w-[30%] font-medium text-gray-500 uppercase tracking-wider">
                            Due Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                            {(provided) => (
                              <tr
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="cursor-grabbing border-b"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.dueDate}</td>
                              </tr>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </tbody>
                    </table>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
          <div className="bg-white w-full text-right absolute p-4 pr-3">
            <button
              onClick={() => (updateChanges(items))}
              className="bg-blue-500 rounded text-white py-1 px-2"
            >
              {  "Update"}
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default DraggableTable;
  