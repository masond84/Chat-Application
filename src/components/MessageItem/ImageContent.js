import { useEffect, useState } from "react";

import { FileRepository } from "@amityco/js-sdk";

export function ImageContent({ data: { caption } = {}, fileId }) {
  const [fileUrl, setFileUrl] = useState();

  useEffect(() => {
    const file = FileRepository.getFile(fileId);

    if (file.model) {
      setFileUrl(file.model.fileUrl);
    } else {
      file.once("dataUpdated", (model) => {
        setFileUrl(model.fileUrl);
      });
    }
  }, [fileId]);

  if (!fileUrl) return null;

  const sizedUrl = fileUrl.startsWith("blob:")
    ? fileUrl
    : `${fileUrl}?size=medium`;

  return (
    <>
      <div className="Image">
        <img src={sizedUrl} alt={caption} />
      </div>
      {caption && (
        <div className="Text">
          <em>{caption}</em>
        </div>
      )}
    </>
  );
}
