import NewTask from "./newTask";

const Header = () => {

    const openNewTask = () => {
        document.querySelector(".newTask").classList.add("open")
    }

    return (
        <div className="header">
            <div className="top">
                <p>THINGS TO DO LIST</p>
                <button onClick={openNewTask}>+</button>
            </div>
            <NewTask/>
        </div>
    );
};

export default Header;