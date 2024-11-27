import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
  const [formData, setFormData] = useState({
    url: "",
  });

  const [metaData, setMetaData] = useState({
    errors: {},
    loading: false,
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMetaData({
      ...metaData,
      loading: true,
    });


    if (validateForm()) {
      console.log(formData);
      fetch('http://localhost:8080/v1/url', {
        method: 'POST',
        body: JSON.stringify(formData)
      }).then(res => res.json().then(r => console.log("response received: " + JSON.stringify(r))))
          .catch(e => {
            console.log("Error occurred: " + e.message)
          })
    } else {
      console.log("Form is invalid");
    }

    setMetaData({
      ...metaData,
      loading: false,
    });
  }
  
  const validateForm = () => {
    const errors = {};

    if (!formData.url) {
      errors.url = "url cannot be empty";
    }

    setMetaData({ ...metaData, errors: errors });
    console.log(metaData.errors.url)

    return Object.keys(errors).length === 0;
  }

  return (
      <div>
        <form onSubmit={handleSubmit}>
        <label>
          Url:
          <input type="text" name="url" placeholder="Url" value={formData.url} onChange={handleChange} />
        </label> {metaData.errors.url && (
            <p style={{ color: "red" }}>{metaData.errors.url}</p>
        )}
        <input type="submit" value="Submit" />
        </form>
      </div>
  );
}

export default App;
