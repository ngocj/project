

export const Tochuc = () => {
    return (
        <div className="container">
            <h3 className='fw-bold mt-3'>Tổ chức</h3>
            <div className='row'>
                <div className='col'>
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder='Email' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Số điện thoại</label>
                            <input type="number" className="form-control" placeholder='Số điện thoại' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Địa chỉ</label>
                            <input type="address" className="form-control" placeholder='Địa chỉ' />
                        </div>
                    </form>
                </div>
                <div className='col'>
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Mã số thuế</label>
                            <input type="text" className="form-control" placeholder='Mã số thuế' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Website</label>
                            <input type="number" className="form-control" placeholder='Website' />
                        </div>
                        <button type="submit" className="btn btn-primary">Cập nhật</button>
                    </form>
                </div>
            </div>
        </div>
    )
}