type TableRow = { x?: string; y?: string };

type TableOfValuesBlockProps = {
  title?: string;
  xLabel?: string;
  yLabel?: string;
  rows?: TableRow[];
  headerColor?: string;
};

const formatCell = (value?: string) =>
  !value || value.trim() === "" ? "\u00A0" : value;

export function TableOfValuesBlock({
  title,
  xLabel = "x",
  yLabel = "y",
  rows = [],
  headerColor = "bg-black",
}: TableOfValuesBlockProps) {
  return (
    <div className="my-6 w-full flex justify-center">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        
        {title && (
          <h3 className="mb-3 text-lg font-semibold text-slate-900 text-center">
            {title}
          </h3>
        )}

        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse text-center text-sm">
            <thead>
              <tr className={`h-12 text-white ${headerColor}`}>
                <th className="w-1/2 px-3 py-2 font-medium border-r border-white">
                  {xLabel}
                </th>
                <th className="w-1/2 px-3 py-2 font-medium">
                  {yLabel}
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-slate-50" : "bg-slate-100"}
                >
                  <td className="h-10 px-3 align-middle border-r border-white text-slate-900">
                    {formatCell(row.x)}
                  </td>
                  <td className="h-10 px-3 align-middle text-slate-900">
                    {formatCell(row.y)}
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr className="bg-slate-50">
                  <td
                    colSpan={2}
                    className="h-10 px-3 py-4 text-center text-slate-500"
                  >
                    No values to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
