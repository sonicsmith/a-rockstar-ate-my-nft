export const ArtistSearch = () => {
  return (
    <div className="nes-container with-title">
      <h3 className="title">Search For Artist</h3>
      <div className="nes-field">
        <label htmlFor="name_field">Your name</label>
        <input type="text" id="name_field" className="nes-input" />
      </div>
    </div>
  );
};
