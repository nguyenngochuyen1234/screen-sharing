/* Câu 1*/
use NORTHWND

go

alter proc sp_A41906
@country as nvarchar(15)
as
begin 
	declare @suppliers_id as int, 
		@suppliers_name as nvarchar(40), 
		@suppliers_address as nvarchar(60),
		@product_count as int
	declare supplierscursor CURSOR FOR
		select S.SupplierID, S.CompanyName, S.Address, COUNT(P.ProductID) as productCount
		from Suppliers as S inner join Products as P on S.SupplierID = P.SupplierID
		where S.Country = @country
		group by S.SupplierID, S.CompanyName, S.Address
		order by S.CompanyName

	open supplierscursor

	fetch NEXT from supplierscursor INTO @suppliers_id, @suppliers_name, @suppliers_address, @product_count

	WHILE @@FETCH_STATUS = 0
	begin
		declare @product_list_id as nvarchar(200)
		set @product_list_id = ''
		select @product_list_id = @product_list_id + CAST(P.ProductID as nvarchar(10)) + ';'
		from Products as P
		where p.SupplierID = @suppliers_id

		PRINT 'Supplier ID: ' + CAST(@suppliers_id as nvarchar(10)) + ', Supplier Name: ' + @suppliers_name + 
		', Supplier Address: ' + @suppliers_address + ', Product Count: ' + CAST(@product_count as nvarchar(10)) +
		', Product List ID: ' + @product_list_id

	 fetch NEXT from supplierscursor INTO @suppliers_id, @suppliers_name, @suppliers_address, @product_count
	end
	CLOSE supplierscursor
	DEALLOCATE supplierscursor
end

go 
exec sp_A41906 'USA'

go


/* câu 2*/

create trigger trg_insertProductInstead
	on Products
	instead of insert 
as
begin
	if exists (select * from inserted WHERE UnitPrice < 10)
	begin
		RAISERROR('Can not insert product', 16, 1)
		ROLLBACK
	end
	else
	begin 
		--select * from inserted
		insert into Products(ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
		select ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued from inserted
	end
end
go

select * from Products
set IDENTITY_INSERT Products on
go
insert into Products(ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel,Discontinued) 
values(104, 'abce', 1, 2, '30 boxes', 9, 30, 12, 0, 0)
go



/*Câu 3*/
use master
go
create login A44059_C1 with password='1'

create login A44059_C2 with password='1'
grant create any database to A44059_C2
go

use NORTHWND
create user A44059_db1 for login A44059_C1
grant select, insert, update, delete on Suppliers to A44059_db1
grant select, insert, update, delete on Products to A44059_db1
grant exec to A44059_db1

create user A44059_db2 for login A44059_C2
grant insert, select on Employees to A44059_db2 
grant insert, select on Employees to A44059_db2 