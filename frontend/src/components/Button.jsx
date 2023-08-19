function Button({ text, onClick }) {
    return (
    <div className="p-[3px] rounded bg-gradient-to-r from-rose-500 to-purple-500">
        <button onClick={onClick} className="px-8 py-2 bg-[#09121D] rounded text-white font-semibold">
            <span>{ text }</span>
        </button>
    </div>
    );
}

export default Button;