// เพิ่มฟังก์ชันสำหรับการเพิ่มโฟลเดอร์
function addFolder(parentFolder, folderName) {
  const newFolder = {
    name: folderName,
    type: "folder",
    children: [],
  };
  parentFolder.children.push(newFolder);

  const newFolderElement = createTreeElement(newFolder);
  parentFolder.element.appendChild(newFolderElement);
}

// เพิ่มฟังก์ชันสำหรับการเพิ่มไฟล์
function addFile(parentFolder, fileName) {
  const newFile = {
    name: fileName,
    type: "file",
  };
  parentFolder.children.push(newFile);

  const newFileElement = createTreeElement(newFile);
  parentFolder.element.appendChild(newFileElement);
}

// เพิ่มฟังก์ชันสำหรับการลบโฟลเดอร์
function deleteFolder(parentFolder, folderIndex) {
  parentFolder.children.splice(folderIndex, 1);
  parentFolder.element.removeChild(
    parentFolder.element.childNodes[folderIndex]
  );
}

// เพิ่มฟังก์ชันสำหรับการลบไฟล์
function deleteFile(parentFolder, fileIndex) {
  parentFolder.children.splice(fileIndex, 1);
  parentFolder.element.removeChild(parentFolder.element.childNodes[fileIndex]);
}

// สร้างฟังก์ชันเพื่อหา Element หลักของไฟล์หรือโฟลเดอร์
function getParentElement(element) {
  let parent = element.parentNode;
  while (parent) {
    if (parent.classList && parent.classList.contains("folder")) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return null;
}

// สร้างฟังก์ชันสำหรับการลบไฟล์หรือโฟลเดอร์ที่ถูกเลือก
function deleteSelectedItem() {
  const selectedItem = document.querySelector(".selected");
  if (!selectedItem) {
    alert("Please select an item to delete.");
    return;
  }

  const parentElement = getParentElement(selectedItem);
  const parentFolder = getParentFolder(parentElement);
  const index = Array.from(parentElement.children).indexOf(selectedItem);

  if (parentFolder) {
    if (selectedItem.classList.contains("file")) {
      deleteFile(parentFolder, index);
    } else if (selectedItem.classList.contains("folder")) {
      deleteFolder(parentFolder, index);
    }
  }
}

// แบบเดียวกับเดิม
const folderStructure = {
  name: "Root",
  type: "folder",
  children: [
    {
      name: "Folder 1",
      type: "folder",
      children: [
        { name: "File 1.txt", type: "file" },
        { name: "File 2.txt", type: "file" },
      ],
    },
    {
      name: "Folder 2",
      type: "folder",
      children: [{ name: "File 3.txt", type: "file" }],
    },
  ],
};

// เพิ่มฟังก์ชันสำหรับการลบไฟล์หรือโฟลเดอร์ที่ถูกเลือก
function deleteSelectedFolder() {
  const selectedItem = document.querySelector(".selected");
  if (!selectedItem) {
    alert("Please select an item to delete.");
    return;
  }

  const parentElement = getParentElement(selectedItem);
  const parentFolder = getParentFolder(parentElement);
  const index = Array.from(parentElement.children).indexOf(selectedItem);

  if (parentFolder) {
    if (selectedItem.classList.contains("file")) {
      deleteFile(parentFolder, index);
    } else if (selectedItem.classList.contains("folder")) {
      deleteFolder(parentFolder, index);
    }
  }
}

// สร้างองค์ประกอบสำหรับโครงสร้างแบบต้นไม้
function createTreeElement(item) {
  const element = document.createElement("div");
  element.textContent = item.name;
  element.classList.add(item.type);
  if (item.type === "folder" && item.children) {
    item.children.forEach((child) => {
      const childElement = createTreeElement(child);
      element.appendChild(childElement);
    });
  }
  return element;
}

// เพิ่มฟังก์ชันสำหรับการเพิ่มโฟลเดอร์หลัก
function addMainFolder() {
  const newMainFolder = {
    name: "New Main Folder",
    type: "folder",
    children: [],
  };

  folderStructure.children.push(newMainFolder);

  const newMainFolderElement = createTreeElement(newMainFolder);
  folderTree.appendChild(newMainFolderElement);
}

// เลือก div ที่มี id เป็น "folderTree"
const folderTree = document.getElementById("folderTree");

// สร้างโครงสร้างแบบต้นไม้และแสดงไปยังหน้าเว็บ
const treeElement = createTreeElement(folderStructure);
folderTree.appendChild(treeElement);
