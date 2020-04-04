import React, { useState } from "react";
import { Auth, Storage } from "aws-amplify";
import { v4 as uuid } from "uuid";

import { Button } from "@material-ui/core";

const ImageUpload = (props) => {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file) => {
    console.log(props);
    const fileName = `upload/${uuid()}`;
    const user = await Auth.currentAuthenticatedUser();

    const result = await Storage.vault.put(fileName, file, {
      metadata: {
        collectionid: props.props.id,
        owner: user.username,
      },
    });
    console.log("Uploaded File:", result);
  };

  const onChange = async (e) => {
    setUploading(true);

    let files = [];
    for (var i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files.item(i));
    }
    await Promise.all(files.map((f) => uploadFile(f)));
    setUploading(false);
  };
  return (
    <div>
      <Button
        onClick={() => document.getElementById("add-image-file-input").click()}
        disabled={uploading}
        icon="file image outline"
        content={uploading ? "Uploading..." : "Add Images"}
      >
        Upload Image
      </Button>

      <input
        id="add-image-file-input"
        type="file"
        accept="image/*"
        multiple
        onChange={onChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUpload;
