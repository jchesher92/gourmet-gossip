import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'

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

  function deleteImage() {
    setFormData({ ...formData, image: '' })
  }

  return (
    <>
      {formData.image ?
        <div className='container-delete-image'>
          <img src={formData.image} alt="uploaded image" name='image' id='image' className='image-upload' />
          <Button onClick={deleteImage}>x</Button>
        </div>
        :
        <>
          <Form.Control required type='file' className='image-input' id='image' name='image' onChange={handleUpload}></Form.Control>
          <Form.Control.Feedback type="invalid">Image is required.</Form.Control.Feedback>
          <label hidden htmlFor="image" className="image-label">Image Upload</label>
        </>
      }
    </>
  )
}