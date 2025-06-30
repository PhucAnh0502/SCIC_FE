import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "./AdminSummaryHeatMap.css";

const PermissionHeatmap = ({
  startDate,
  today,
  heatmapData,
  tooltip,
  setTooltip,
  formatDateVN,
}) => (
  <div className="bg-white rounded-xl shadow-md p-8 mt-8">
    <div className="text-center mb-6">
      <h2 className="text-xl font-semibold text-orange-700 mb-2">
        Lịch sử phân quyền
      </h2>
    </div>
    <div className="flex justify-center mb-6">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-inner">
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <CalendarHeatmap
              startDate={startDate}
              endDate={today}
              values={heatmapData}
              horizontal={true}
              gutterSize={3}
              showWeekdayLabels={true}
              showMonthLabels={true}
              weekdayLabels={['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']}
              monthLabels={[
                'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
                'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
                'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
              ]}
              classForValue={(value) => {
                if (!value || value.count === 0) return "color-empty";
                if (value.count < 2) return "color-scale-1";
                if (value.count < 4) return "color-scale-2";
                if (value.count < 7) return "color-scale-3";
                return "color-scale-4";
              }}
              onClick={(value) => {
                if (value && value.date) {
                  alert(`Ngày: ${formatDateVN(value.date)}\nSố phân quyền: ${value.count || 0}`);
                }
              }}
              onMouseEnter={(event, value) => {
                if (value && value.date) {
                  setTooltip({
                    show: true,
                    content: `${formatDateVN(value.date)} - ${value.count || 0} phân quyền`,
                    x: event.pageX,
                    y: event.pageY
                  });
                } else {
                  setTooltip({
                    show: true,
                    content: 'Không có dữ liệu',
                    x: event.pageX,
                    y: event.pageY
                  });
                }
              }}
              onMouseLeave={() => {
                setTooltip({ show: false, content: '', x: 0, y: 0 });
              }}
              tooltipDataAttrs={() => ({})}
            />
            {/* Custom Tooltip */}
            {tooltip.show && (
              <div
                className="heatmap-tooltip"
                style={{
                  left: tooltip.x,
                  top: tooltip.y,
                }}
              >
                {tooltip.content}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    {/* Legend */}
    <div className="flex flex-col items-center space-y-3">
      <span className="text-sm font-medium text-gray-600">Mức độ hoạt động</span>
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Ít</span>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-gray-200 border border-gray-300 rounded-sm"></span>
            <span className="w-3 h-3 bg-orange-200 border border-orange-300 rounded-sm"></span>
            <span className="w-3 h-3 bg-orange-400 border border-orange-500 rounded-sm"></span>
            <span className="w-3 h-3 bg-orange-600 border border-orange-700 rounded-sm"></span>
            <span className="w-3 h-3 bg-orange-900 border border-orange-900 rounded-sm"></span>
          </div>
          <span className="text-xs text-gray-500">Nhiều</span>
        </div>
      </div>
      <div className="flex justify-center gap-8 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-gray-200 border border-gray-300 rounded-sm"></span>
          0 phân quyền
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-orange-200 border border-orange-300 rounded-sm"></span>
          1-2 phân quyền
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-orange-400 border border-orange-500 rounded-sm"></span>
          3-4 phân quyền
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-orange-600 border border-orange-700 rounded-sm"></span>
          5-6 phân quyền
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-orange-900 border border-orange-900 rounded-sm"></span>
          7+ phân quyền
        </span>
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700 text-center">
          💡 <strong>Hướng dẫn:</strong> Di chuột qua các ô để xem ngày cụ thể, click vào ô để xem thông tin chi tiết
        </p>
      </div>
    </div>
  </div>
);

export default PermissionHeatmap;