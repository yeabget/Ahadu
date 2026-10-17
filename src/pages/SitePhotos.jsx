
import { useEffect, useState } from "react";
import { Camera, Upload, Trash2, ImagePlus } from "lucide-react";

export default function SitePhotos() {
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState("");

  function handleFiles(event) {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (!validFiles.length) {
      setMessage("Please choose image files.");
      return;
    }

    const newPhotos = validFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      name: file.name,
      caption: file.name.replace(/\.[^/.]+$/, ""),
      url: URL.createObjectURL(file),
    }));

    setPhotos((previous) => [...newPhotos, ...previous]);
    setMessage(`${newPhotos.length} photo(s) added.`);
    event.target.value = "";
  }

  function updateCaption(id, caption) {
    setPhotos((previous) =>
      previous.map((photo) => photo.id === id ? { ...photo, caption } : photo)
    );
  }

  function removePhoto(id) {
    setPhotos((previous) => {
      const photo = previous.find((item) => item.id === id);
      if (photo) URL.revokeObjectURL(photo.url);
      return previous.filter((item) => item.id !== id);
    });
  }

  useEffect(() => {
    return () => photos.forEach((photo) => URL.revokeObjectURL(photo.url));
  }, []);

  return (
    <div className="page">
      <div className="page-heading">
        <div><p className="eyebrow">SITE DOCUMENTATION</p><h1>Site Photos</h1><p>Document construction progress with site images.</p></div>
        <label className="primary-button upload-button">
          <Upload size={18} /> Upload Photos
          <input type="file" accept="image/*" multiple hidden onChange={handleFiles} />
        </label>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon"><Camera size={21} /></div><p>Photos This Session</p><h2>{photos.length}</h2></div>
      </div>

      {message && <p className="inline-message" role="status">{message}</p>}

      {!photos.length ? (
        <section className="panel photo-empty">
          <div className="empty-photo-icon"><ImagePlus size={32} /></div>
          <h2>No site photos yet</h2>
          <p>Upload photos to record milestones, inspections, and construction progress.</p>
          <label className="secondary-button upload-button">
            <Upload size={17} /> Choose Images
            <input type="file" accept="image/*" multiple hidden onChange={handleFiles} />
          </label>
        </section>
      ) : (
        <div className="photo-grid">
          {photos.map((photo) => (
            <article className="photo-card panel" key={photo.id}>
              <img src={photo.url} alt={photo.caption || photo.name} />
              <div className="photo-card-body">
                <label>Photo caption
                  <input value={photo.caption} onChange={(e) => updateCaption(photo.id, e.target.value)} />
                </label>
                <div className="photo-card-footer">
                  <span title={photo.name}>{photo.name.length > 24 ? photo.name.slice(0, 21) + "…" : photo.name}</span>
                  <button className="icon-button danger-button" onClick={() => removePhoto(photo.id)} aria-label={`Remove ${photo.name}`}>
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      <p className="muted photo-note">Photos are temporary browser previews. They are not uploaded to a server or saved permanently.</p>
    </div>
  );
}
