export default function NotSurePreview({
  onPreview,
}: {
  onPreview: () => void;
}) {
  return (
    <div className="text-center mt-8">
      <button
        onClick={onPreview}
        className="text-pink-600 font-medium underline underline-offset-4"
      >
        Not sure? Preview all templates
      </button>
    </div>
  );
}
