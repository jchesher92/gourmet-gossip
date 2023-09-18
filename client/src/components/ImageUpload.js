import axios from 'axios'
import Form from 'react-bootstrap/Form'

export default function ImageUpload({ formData, setFormData }) {

  const handleUpload = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
    try {
      const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data)
      setFormData({ ...formData, image: res.data.secure_url })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      { formData.image ?
        <img src={formData.image} alt="uploaded image" className='image-upload' />
        :
        <>
          <Form.Control required type='file' className='form-control' name='image' onChange={handleUpload}></Form.Control>
          <Form.Control.Feedback type="invalid">Image is required.</Form.Control.Feedback>
          <label  htmlFor="image" className="form-label">Image Upload</label>
        </>
      }
    </>
  )
}