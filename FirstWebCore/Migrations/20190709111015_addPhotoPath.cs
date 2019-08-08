using Microsoft.EntityFrameworkCore.Migrations;

namespace FirstWebCore.Migrations
{
    public partial class addPhotoPath : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "photoPath",
                table: "AskUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "photoPath",
                table: "AskUsers");
        }
    }
}
