import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // li, div生成
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.className = "list-row";

  // pタグ生成
  const newp = document.createElement("p");
  newp.innerText = text;

  // button(完了)タブ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タブ(li>div)を未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode.parentNode);

    // 押された完了ボタンの親タブを完了リストに追加
    const addTarget_div = completeButton.parentNode;
    // Todo内容テキストを取得
    const TodoText = addTarget_div.firstElementChild.innerText;
    // div以下を初期化
    addTarget_div.textContent = null;
    // タグ生成
    const newp = document.createElement("p");
    newp.innerText = TodoText;
    // 戻すボタン生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグ（div）を完了リストから削除
      const deleteTarget = backButton.parentNode.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);
      // テキスト取得
      const TodoText = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(TodoText);
    });

    // 子要素に各要素を設定、div要素の親にli要素を追加
    addTarget_div.appendChild(newp);
    addTarget_div.appendChild(backButton);
    const addTarget = document.createElement("li");
    addTarget.appendChild(addTarget_div);
    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button(削除)タブ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タブ(li>div)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode.parentNode);
  });

  // li, divタグの子要素に書く要素を設定
  div.appendChild(newp);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
