import React from 'react'

const InputArea = (props) => {
    const val = props.val;
    const msg = { 'p': 'Paragraph', 'h2': 'Sub Heading', 'Code': 'Code block', 'img': 'Image block' }
    let colors = { 'p': '#2626db', 'h2': '#18dbd2', 'Code': '#6a0808', 'img': '#8a62eb' };
    let color = colors[val[0]]
    let k = "element" + val[2];
    const delete_ = (e) => {
        props.delete_element(val);
    }
    return (
        <div className="mb-3" key={k}>
            <div className='d-flex justify-content-between align-items-center mb-2'>
                <label htmlFor={val[2]} className="form-label fw-bold" style={{ color: color }}>
                    <i className={`fa-solid ${val[0] === 'p' ? 'fa-paragraph' : val[0] === 'h2' ? 'fa-heading' : val[0] === 'Code' ? 'fa-code' : 'fa-image'} me-2`}></i>
                    {msg[val[0]]}
                </label>
                <button type="button" className='btn btn-sm btn-outline-danger' name={k + "delete_btn"} onClick={() => { delete_(val) }}>
                    <i className="fa-solid fa-trash me-1"></i>Delete
                </button>
            </div>
            <textarea
                className="form-control"
                name={val[2]}
                rows={val[0] === 'Code' ? "4" : "2"}
                value={val[1]}
                onChange={props.onchange}
                style={{ borderColor: color }}
                placeholder={`Enter your ${msg[val[0]].toLowerCase()}...`}
            ></textarea>
        </div>
    );
}

export default InputArea